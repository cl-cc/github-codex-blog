<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { PhArrowRight } from '@phosphor-icons/vue';
import Reveal from '../components/Reveal.vue';
import heroDesk from '../assets/photos/hero-desk.jpg';
import bentoTools from '../assets/photos/bento-tools.jpg';
import bentoVue from '../assets/photos/bento-vue.jpg';
import bentoDesign from '../assets/photos/bento-design.jpg';

const categories = [
  {
    title: '前端工具',
    description: '常用效率工具、组件库和构建链路，按分类收藏。',
    stats: '200+ 插件精选',
    to: '/tools',
    image: bentoTools,
    alt: '机械键盘与铅笔放在灰色亚麻布上',
    span: 'lg:col-span-7',
    tone: 'photo' as const,
  },
  {
    title: 'Vue 灵感库',
    description: 'Vue 3、组合式 API、动画交互和页面实验。',
    stats: '17 组案例',
    image: bentoVue,
    alt: '关掉屏幕的显示器和一盆绿植',
    span: 'lg:col-span-5',
    tone: 'photo' as const,
  },
  {
    title: 'AI × 创作',
    description: 'AI 与自动化用在内容创作上的笔记。',
    stats: '11 个项目',
    span: 'lg:col-span-5',
    tone: 'accent' as const,
  },
  {
    title: '设计能量站',
    description: '版式、配色、字体和动态视觉的收藏。',
    stats: '36 张灵感卡',
    image: bentoDesign,
    alt: '窗光落在墙面与一把木椅上',
    span: 'lg:col-span-7',
    tone: 'photo' as const,
  },
];

const stack = ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vite', 'React', 'Three.js'];
</script>

<template>
  <div>
    <section class="grid items-end gap-10 pt-10 lg:grid-cols-12 lg:gap-12 lg:pt-16">
      <div class="lg:col-span-5">
        <h1 class="text-5xl font-medium tracking-tight text-ink md:text-6xl lg:text-7xl">程垒</h1>
        <p class="mt-5 max-w-[36ch] text-base leading-relaxed text-muted md:text-lg">
          写前端实践，收常用工具，记一点设计实验。
        </p>
        <div class="mt-8">
          <RouterLink
            to="/tools"
            class="inline-flex items-center gap-2 rounded-sm bg-ink px-5 py-3 text-[15px] font-medium text-canvas transition hover:bg-accent hover:text-accent-fg active:scale-[0.98]"
          >
            前端工具
            <PhArrowRight :size="16" weight="regular" />
          </RouterLink>
        </div>
      </div>

      <div class="lg:col-span-7">
        <div class="aspect-[4/5] overflow-hidden rounded-md bg-elevated lg:aspect-auto lg:h-[calc(100dvh-10rem)] lg:max-h-[560px]">
          <img
            :src="heroDesk"
            alt="窗边书桌：合上的笔记本、空白本子和一杯咖啡"
            width="1024"
            height="1536"
            fetchpriority="high"
            class="h-full w-full object-cover dark:brightness-[0.92]"
          />
        </div>
      </div>
    </section>

    <section id="categories" class="mt-24 lg:mt-32">
      <Reveal>
        <h2 class="max-w-[16ch] text-3xl font-medium tracking-tight text-ink sm:text-4xl">分类</h2>
      </Reveal>

      <div class="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
        <Reveal
          v-for="(item, i) in categories"
          :key="item.title"
          :delay="i * 70"
          :class="['min-h-[280px]', item.span]"
        >
          <component
            :is="item.to ? RouterLink : 'article'"
            :to="item.to"
            class="flex h-full min-h-[280px] flex-col overflow-hidden rounded-md"
            :class="[
              item.tone === 'accent' ? 'bg-accent text-accent-fg' : 'bg-elevated',
              item.to ? 'group' : '',
            ]"
          >
            <div v-if="item.image" class="relative aspect-[16/10] overflow-hidden lg:aspect-[16/9]">
              <img
                :src="item.image"
                :alt="item.alt"
                width="1536"
                height="1024"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] dark:brightness-[0.92]"
              />
            </div>

            <div class="flex flex-1 flex-col justify-between p-6 sm:p-7">
              <div>
                <h3 class="text-2xl font-medium tracking-tight">{{ item.title }}</h3>
                <p class="mt-3 max-w-[36ch] text-sm leading-relaxed" :class="item.tone === 'accent' ? 'text-on-accent' : 'text-muted'">
                  {{ item.description }}
                </p>
              </div>
              <div class="mt-8 flex items-end justify-between gap-4">
                <p class="text-sm" :class="item.tone === 'accent' ? 'text-on-accent' : 'text-muted'">{{ item.stats }}</p>
                <span v-if="item.to" class="inline-flex items-center gap-1 text-sm">
                  打开
                  <PhArrowRight :size="16" weight="regular" class="transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </component>
        </Reveal>
      </div>
    </section>

    <section id="stack" class="mt-24 border-t border-line pt-16 lg:mt-32 lg:pt-20">
      <Reveal>
        <h2 class="text-3xl font-medium tracking-tight text-ink sm:text-4xl">这个站点</h2>
        <p class="mt-6 max-w-[65ch] text-base leading-relaxed text-muted">
          写前端。做工具。偶尔折腾交互和视觉。这里是工作笔记和收藏夹。
        </p>
        <ul class="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-ink">
          <li v-for="item in stack" :key="item">{{ item }}</li>
        </ul>
      </Reveal>
    </section>
  </div>
</template>
