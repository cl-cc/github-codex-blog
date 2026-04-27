<script setup lang="ts">
import { BorderBeam } from 'border-beam-vue3';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import Fuse from 'fuse.js';
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

const accents = ['from-cyan-400/60 via-sky-400/30 to-transparent', 'from-fuchsia-400/60 via-violet-400/30 to-transparent', 'from-orange-400/60 via-rose-400/30 to-transparent', 'from-emerald-400/60 via-teal-400/30 to-transparent'];

const searchQuery = ref('');
const searchInputRef = ref<HTMLInputElement | null>(null);

const sections = computed(() => {
  const data = newToolItems.value as Record<string, ToolBlock>;
  return Object.entries(data).map(([key, block], i) => ({
    key,
    title: block.text,
    isExpand: block.isExpand,
    items: block.items,
    accent: accents[i % accents.length],
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

onMounted(() => window.addEventListener('keydown', onGlobalKeydown));
onUnmounted(() => window.removeEventListener('keydown', onGlobalKeydown));
</script>

<template>
  <div class="pb-8 pt-4">
    <section class="mb-10">
      <div class="mb-6 inline-flex items-center gap-3 rounded-full border border-neon/30 bg-neon/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#303133]">
        <span class="relative inline-flex h-3 w-3">
          <span class="absolute inline-flex h-full w-full rounded-full bg-neon animate-pulseRing"></span>
          <span class="relative inline-flex h-3 w-3 rounded-full bg-neon"></span>
        </span>
        Toolbox
      </div>
      <h1 class="font-display text-4xl uppercase leading-tight sm:text-5xl lg:text-6xl text-[#303133]">
        前端
        <span class="bg-[linear-gradient(90deg,#7cf6ff_0%,#d8e7ff_45%,#ff8a5b_100%)] bg-clip-text text-transparent">工具库</span>
      </h1>
      <p class="mt-4 max-w-2xl text-base leading-8 text-[#303133] sm:text-lg">收录常用框架文档、UI 库、插件与可视化资源，数据来自个人收藏清单，点击分类标题可展开 / 收起。</p>

      <div class="relative mt-8 max-w-xl">
        <span class="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#303133]" aria-hidden="true">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.2-5.2M11 18a7 7 0 100-14 7 7 0 000 14z" />
          </svg>
        </span>
        <BorderBeam>
          <input
            ref="searchInputRef"
            v-model="searchQuery"
            type="search"
            enterkeyhint="search"
            autocomplete="off"
            placeholder="搜索名称、简介、分类…（按 / 聚焦）"
            :class="['w-full rounded-2xl border-2 border-white/40 bg-white/[0.06] py-3.5 pl-12 text-sm text-[#303133] placeholder:text-[#303133] backdrop-blur-md transition focus:border-white/55 focus:outline-none focus:ring-2 focus:ring-white/25', isSearchActive ? 'pr-36 sm:pr-40' : 'pr-24']"
            @keydown="onSearchKeydown"
          />
        </BorderBeam>
        <div v-if="!isSearchActive" class="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#303133]">
          <kbd class="pointer-events-none hidden rounded-md border border-white/15 bg-white/[0.06] px-1.5 py-0.5 font-sans text-[#303133] sm:inline">esc</kbd>
        </div>
        <button v-if="isSearchActive" type="button" class="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#303133] transition hover:border-neon/40" @click="clearSearch">清除</button>
      </div>
      <p v-if="isSearchActive" class="mt-3 text-sm text-[#303133]">
        找到 <span class="font-medium text-[#303133]">{{ totalMatchCount }}</span> 条相关链接
        <span v-if="totalMatchCount === 0">，试试其它关键词</span>
      </p>
    </section>

    <div v-if="isSearchActive && totalMatchCount === 0" class="rounded-[1.75rem] border border-white/10 bg-white/[0.04] px-6 py-14 text-center backdrop-blur-md">
      <p class="text-sm uppercase tracking-[0.28em] text-[#303133]">No results</p>
      <p class="mt-3 text-lg font-medium text-[#303133]">没有匹配的工具</p>
      <p class="mt-2 text-sm text-[#303133]">调整关键词，或点击「清除」返回完整列表。</p>
    </div>

    <div v-else class="space-y-5">
      <article v-for="section in activeSections" :key="section.key" class="group relative overflow-hidden rounded-[1.75rem] border-2 border-white/40 bg-white/[0.06] backdrop-blur-md transition duration-300 hover:border-white/55">
        <div class="absolute inset-0 bg-gradient-to-br opacity-50 transition duration-300 group-hover:opacity-70" :class="section.accent"></div>
        <div class="absolute right-6 top-6 h-24 w-24 rounded-full border border-white/10 bg-white/5 blur-2xl"></div>

        <div class="relative">
          <button v-if="!isSearchActive" type="button" class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8" @click="toggle(section.key)">
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-[#303133]">Category</p>
              <h2 class="mt-2 text-xl font-semibold text-[#303133] sm:text-2xl">{{ section.title }}</h2>
            </div>
            <span class="shrink-0 rounded-full border border-white/15 bg-slate-950/50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#fff]">
              {{ section.isExpand ? '收起' : '展开' }}
            </span>
          </button>

          <div v-else class="flex w-full items-center justify-between gap-4 px-6 py-5 sm:px-8">
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-[#303133]">Category</p>
              <h2 class="mt-2 text-xl font-semibold text-[#303133] sm:text-2xl">{{ section.title }}</h2>
            </div>
            <span class="shrink-0 rounded-full border border-neon/25 bg-neon/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#303133]"> {{ section.items.length }} 条匹配 </span>
          </div>

          <div v-show="isSearchActive || section.isExpand" class="border-t border-white/30 px-6 pb-6 pt-2 sm:px-8">
            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <a v-for="(link, idx) in section.items" :key="`${section.key}-${link.id}-${idx}`" :href="link.url" target="_blank" rel="noopener noreferrer" class="flex flex-col rounded-2xl border border-white/30 bg-white/[0.04] px-4 py-3 transition hover:border-neon/50 hover:bg-white/[0.07]">
                <span class="text-sm font-medium text-[#303133]">{{ link.text || link.introduction }}</span>
                <span class="mt-1 line-clamp-2 text-xs leading-relaxed text-[#303133]">{{ link.introduction }}</span>
                <span class="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#303133]">Open ↗</span>
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
