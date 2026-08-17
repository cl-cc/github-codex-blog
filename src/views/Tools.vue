<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import Fuse from 'fuse.js';
import { PhArrowUpRight, PhCaretDown, PhMagnifyingGlass, PhX } from '@phosphor-icons/vue';
import { newToolItems } from '../toolData';

type ToolBlock = {
  text: string;
  isExpand: boolean;
  items: { id: number; text: string; introduction: string; url: string }[];
};

type ToolItem = ToolBlock['items'][number];

type SearchableItem = ToolItem & {
  uniqueKey: string;
  categoryKey: string;
  categoryTitle: string;
};

const shortLabels: Record<string, string> = {
  frame: '框架',
  webUi: 'Web UI',
  mobileUi: '移动',
  visual: '可视化',
  plugin: '插件',
  iconFont: '图标',
  interview: '面试',
  ai: 'AI',
  skill: 'Skills',
  learningRoute: '其他',
  website: '收藏',
};

const searchQuery = ref('');
const searchInputRef = ref<HTMLInputElement | null>(null);

const sections = computed(() => {
  const data = newToolItems.value as Record<string, ToolBlock>;
  return Object.entries(data).map(([key, block]) => ({
    key,
    title: block.text,
    short: shortLabels[key] ?? block.text,
    isExpand: block.isExpand,
    items: block.items,
  }));
});

const flatForSearch = computed((): SearchableItem[] => {
  const data = newToolItems.value as Record<string, ToolBlock>;
  const list: SearchableItem[] = [];
  for (const [categoryKey, block] of Object.entries(data)) {
    block.items.forEach((item, idx) => {
      list.push({
        ...item,
        uniqueKey: `${categoryKey}-${item.id}-${idx}`,
        categoryKey,
        categoryTitle: block.text,
      });
    });
  }
  return list;
});

const fuse = computed(
  () =>
    new Fuse(flatForSearch.value, {
      keys: [
        { name: 'text', weight: 0.42 },
        { name: 'introduction', weight: 0.42 },
        { name: 'categoryTitle', weight: 0.12 },
        { name: 'url', weight: 0.04 },
      ],
      threshold: 0.34,
      ignoreLocation: true,
      minMatchCharLength: 1,
    })
);

const isSearchActive = computed(() => searchQuery.value.trim().length > 0);

const searchSections = computed(() => {
  const q = searchQuery.value.trim();
  if (!q) return [];
  const results = fuse.value.search(q);
  const byKey = new Map<string, ToolItem[]>();
  const seen = new Set<string>();
  for (const { item } of results) {
    if (seen.has(item.uniqueKey)) continue;
    seen.add(item.uniqueKey);
    const row: ToolItem = {
      id: item.id,
      text: item.text,
      introduction: item.introduction,
      url: item.url,
    };
    const arr = byKey.get(item.categoryKey) ?? [];
    arr.push(row);
    byKey.set(item.categoryKey, arr);
  }
  return sections.value
    .map(s => ({
      ...s,
      items: byKey.get(s.key) ?? [],
    }))
    .filter(s => s.items.length > 0);
});

const activeSections = computed(() => (isSearchActive.value ? searchSections.value : sections.value));

const totalMatchCount = computed(() => searchSections.value.reduce((n, s) => n + s.items.length, 0));

function toggle(key: string) {
  const data = newToolItems.value as Record<string, ToolBlock>;
  const block = data[key];
  if (block) block.isExpand = !block.isExpand;
}

function clearSearch() {
  searchQuery.value = '';
}

function onSearchKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    clearSearch();
    searchInputRef.value?.blur();
  }
}

function onGlobalKeydown(e: KeyboardEvent) {
  if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
    const t = e.target as HTMLElement | null;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    e.preventDefault();
    searchInputRef.value?.focus();
  }
}

function scrollToSection(key: string) {
  const el = document.getElementById(`cat-${key}`);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

onMounted(() => window.addEventListener('keydown', onGlobalKeydown));
onUnmounted(() => window.removeEventListener('keydown', onGlobalKeydown));
</script>

<template>
  <div class="pt-10 lg:pt-16">
    <section class="max-w-2xl">
      <h1 class="text-4xl font-medium tracking-tight text-ink sm:text-5xl">前端工具库</h1>
      <p class="mt-4 max-w-[65ch] text-base leading-relaxed text-muted">
        常用框架文档、UI 库、插件和可视化资源。点分类标题可展开或收起。
      </p>

      <div class="mt-8 flex flex-col gap-2">
        <label for="tool-search" class="text-sm text-ink">搜索</label>
        <div class="relative">
          <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true">
            <PhMagnifyingGlass :size="20" weight="regular" />
          </span>
          <input
            id="tool-search"
            ref="searchInputRef"
            v-model="searchQuery"
            type="search"
            enterkeyhint="search"
            autocomplete="off"
            placeholder="名称、简介或分类"
            class="w-full rounded-sm border border-line bg-elevated py-3.5 pl-11 text-[15px] text-ink placeholder:text-muted transition focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            :class="isSearchActive ? 'pr-24' : 'pr-16'"
            @keydown="onSearchKeydown"
          />
          <button
            v-if="isSearchActive"
            type="button"
            class="absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded-sm px-2 py-1 text-sm text-muted transition hover:text-ink active:scale-[0.98]"
            @click="clearSearch"
          >
            <PhX :size="16" weight="regular" />
            清除
          </button>
          <kbd
            v-else
            class="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-sm border border-line px-1.5 py-0.5 text-xs text-muted sm:inline"
          >
            /
          </kbd>
        </div>
        <p class="text-sm text-muted">按 / 聚焦搜索框。</p>
      </div>

      <p v-if="isSearchActive" class="mt-4 text-sm text-muted">
        找到 <span class="text-ink">{{ totalMatchCount }}</span> 条相关链接
        <span v-if="totalMatchCount === 0">，试试其它关键词</span>
      </p>
    </section>

    <nav v-if="!isSearchActive" class="mt-10 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" aria-label="工具分类">
      <ul class="flex w-max gap-2 pb-1 snap-x">
        <li v-for="section in sections" :key="section.key" class="snap-start">
          <button
            type="button"
            class="rounded-sm border border-line bg-elevated px-3 py-1.5 text-sm text-ink transition hover:border-ink active:scale-[0.98]"
            @click="scrollToSection(section.key)"
          >
            {{ section.short }}
          </button>
        </li>
      </ul>
    </nav>

    <div
      v-if="isSearchActive && totalMatchCount === 0"
      class="mt-14 max-w-xl rounded-md border border-line bg-elevated px-6 py-14"
    >
      <p class="text-lg font-medium text-ink">没有匹配的工具</p>
      <p class="mt-2 text-sm leading-relaxed text-muted">换个词再搜，或清除后看完整列表。</p>
      <button
        type="button"
        class="mt-6 inline-flex items-center rounded-sm bg-ink px-4 py-2 text-sm font-medium text-canvas transition hover:bg-accent hover:text-accent-fg active:scale-[0.98]"
        @click="clearSearch"
      >
        清除
      </button>
    </div>

    <div v-else class="mt-8">
      <article
        v-for="section in activeSections"
        :id="`cat-${section.key}`"
        :key="section.key"
        class="scroll-mt-24 border-b border-line py-2"
      >
        <button
          v-if="!isSearchActive"
          type="button"
          class="flex w-full items-center justify-between gap-4 py-5 text-left"
          :aria-expanded="section.isExpand"
          @click="toggle(section.key)"
        >
          <span>
            <h2 class="text-xl font-medium tracking-tight text-ink sm:text-2xl">{{ section.title }}</h2>
            <span class="mt-1 block text-sm text-muted">{{ section.items.length }}</span>
          </span>
          <PhCaretDown
            :size="20"
            weight="regular"
            class="shrink-0 text-muted transition"
            :class="section.isExpand ? 'rotate-180' : ''"
          />
        </button>

        <div v-else class="flex w-full items-center justify-between gap-4 py-5">
          <h2 class="text-xl font-medium tracking-tight text-ink sm:text-2xl">{{ section.title }}</h2>
          <span class="text-sm text-muted">{{ section.items.length }}</span>
        </div>

        <div v-show="isSearchActive || section.isExpand" class="pb-8">
          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <a
              v-for="(link, idx) in section.items"
              :key="`${section.key}-${link.id}-${idx}`"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex flex-col rounded-sm border border-line bg-elevated px-4 py-3 transition hover:border-ink active:scale-[0.99]"
            >
              <span class="flex items-start justify-between gap-3">
                <span class="text-[15px] font-medium text-ink">{{ link.text || link.introduction }}</span>
                <PhArrowUpRight :size="16" weight="regular" class="mt-0.5 shrink-0 text-muted transition group-hover:text-accent" />
              </span>
              <span class="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{{ link.introduction }}</span>
            </a>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
