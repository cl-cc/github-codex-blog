<script setup lang="ts">
import { RouterLink } from 'vue-router';

const categories = [
  {
    title: '前端工具',
    description: '收录我常用的效率工具、调试神器、组件库与构建链路心得。',
    accent: 'from-cyan-400/60 via-sky-400/30 to-transparent',
    stats: '200+ 插件精选',
  },
  {
    title: 'Vue 灵感库',
    description: '记录 Vue3、组合式 API、动画交互与高质感页面设计实验。',
    accent: 'from-fuchsia-400/60 via-violet-400/30 to-transparent',
    stats: '17 组案例',
  },
  {
    title: 'AI × 创作',
    description: '把 AI、自动化与内容创作结合，探索个人品牌的新表达方式。',
    accent: 'from-orange-400/60 via-rose-400/30 to-transparent',
    stats: '11 个项目',
  },
  {
    title: '设计能量站',
    description: '收藏版式、配色、字体与动态视觉的灵感碎片，专治界面普通。',
    accent: 'from-emerald-400/60 via-teal-400/30 to-transparent',
    stats: '36 张灵感卡',
  },
];

const highlights = ['实战型前端技巧', '移动端友好体验'];

const tools = ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vite', 'React', 'Three.js'];
</script>

<template>
  <div>
    <section class="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
      <div class="max-w-3xl">
        <div class="mb-6 inline-flex items-center gap-3 rounded-full border border-neon/30 bg-neon/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-neon">
          <span class="relative inline-flex h-3 w-3">
            <span class="absolute inline-flex h-full w-full rounded-full bg-neon animate-pulseRing"></span>
            <span class="relative inline-flex h-3 w-3 rounded-full bg-neon"></span>
          </span>
          Digital Playground
        </div>

        <h1 class="font-display text-6xl uppercase leading-[0.9] text-white sm:text-7xl lg:text-[8rem]">
          Coding
          <span class="block bg-[linear-gradient(90deg,#7cf6ff_0%,#d8e7ff_45%,#ff8a5b_100%)] bg-clip-text text-transparent"> the future </span>
        </h1>

        <p class="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">一个属于 cheng lei 的炫酷个人博客空间。这里装着前端工具、设计灵感、创意实验和开发记录， 用更强烈的视觉语言，把技术内容也做出舞台感。</p>

        <div class="mt-8 flex flex-col gap-4 sm:flex-row">
          <a href="#categories" class="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900 transition hover:scale-[1.02]"> Explore Categories </a>
          <a href="#stack" class="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white backdrop-blur transition hover:border-neon/40 hover:text-neon"> Tech Stack </a>
        </div>

        <div id="highlights" class="mt-10 flex flex-wrap gap-3">
          <span v-for="item in highlights" :key="item" class="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80 backdrop-blur">
            {{ item }}
          </span>
        </div>
      </div>

      <div class="relative mx-auto w-full max-w-xl">
        <div class="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-neon/25 via-transparent to-flare/25 blur-2xl" />
        <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.08] p-4 shadow-glow backdrop-blur-xl sm:p-6">
          <div class="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-white/45">Creator Dashboard</p>
              <h2 class="mt-2 text-xl font-semibold text-white">内容宇宙控制台</h2>
            </div>
            <div class="flex gap-2">
              <span class="h-3 w-3 rounded-full bg-rose-400"></span>
              <span class="h-3 w-3 rounded-full bg-amber-300"></span>
              <span class="h-3 w-3 rounded-full bg-emerald-400"></span>
            </div>
          </div>

          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <article v-for="item in categories.slice(0, 2)" :key="item.title" class="rounded-3xl border border-white/10 bg-slate-950/65 p-5">
              <div class="h-24 rounded-2xl bg-gradient-to-br" :class="item.accent"></div>
              <p class="mt-4 text-xs uppercase tracking-[0.26em] text-neon">{{ item.stats }}</p>
              <h3 class="mt-3 text-lg font-semibold text-white">{{ item.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-white/60">{{ item.description }}</p>
            </article>
          </div>

          <div class="mt-4 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-[0.26em] text-white/45">Featured Feed</p>
                <p class="mt-2 text-lg font-semibold">酷感内容持续发射中</p>
              </div>
              <div class="rounded-full border border-neon/30 bg-neon/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-neon">Live</div>
            </div>

            <div class="mt-5 space-y-3">
              <div v-for="item in tools" :key="item" class="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                <span class="text-sm text-white/80">{{ item }}</span>
                <span class="text-xs uppercase tracking-[0.22em] text-white/40">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="categories" class="mt-4">
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm uppercase tracking-[0.35em] text-neon">Category Galaxy</p>
          <h2 class="mt-3 text-3xl font-semibold text-white sm:text-4xl">把博客做成一片可探索的内容宇宙</h2>
        </div>
        <p class="max-w-xl text-sm leading-7 text-white/60">除了文章列表，这里更像一个展示台。每个分类都像一个空间站，承载一组鲜明的主题内容。</p>
      </div>

      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <article v-for="item in categories" :key="item.title" class="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20">
          <div class="absolute inset-0 bg-gradient-to-br opacity-60 transition duration-300 group-hover:opacity-80" :class="item.accent"></div>
          <div class="absolute right-5 top-5 h-20 w-20 rounded-full border border-white/15 bg-white/10 blur-2xl"></div>
          <div class="relative">
            <p class="text-xs uppercase tracking-[0.3em] text-white/45">{{ item.stats }}</p>
            <h3 class="mt-5 text-2xl font-semibold text-white">{{ item.title }}</h3>
            <p class="mt-4 text-sm leading-7 text-white/70">{{ item.description }}</p>
            <RouterLink v-if="item.title === '前端工具'" to="/tools" class="mt-8 inline-block rounded-full border border-white/15 bg-slate-950/40 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/80 transition hover:border-neon/40 hover:text-neon"> Enter Zone </RouterLink>
            <button v-else type="button" class="mt-8 rounded-full border border-white/15 bg-slate-950/40 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/80 transition hover:border-neon/40 hover:text-neon">Enter Zone</button>
          </div>
        </article>
      </div>
    </section>

    <section id="stack" class="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <article class="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-md">
        <p class="text-sm uppercase tracking-[0.35em] text-neon">Signature</p>
        <h2 class="mt-4 text-3xl font-semibold text-white">程垒</h2>
        <p class="mt-4 text-sm leading-7 text-white/65">专注于用代码构建未来，在一行行字符中沉淀思考，在一次次实践中突破边界，让技术创造价值，让创新照亮前路。</p>
      </article>

      <article class="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-glow">
        <div class="flex flex-wrap gap-3">
          <span v-for="item in tools" :key="item" class="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75">
            {{ item }}
          </span>
        </div>
        <div class="mt-8 grid gap-4 sm:grid-cols-3">
          <div class="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p class="text-xs uppercase tracking-[0.24em] text-white/40">Layout</p>
            <p class="mt-3 text-lg font-semibold">响应式分栏</p>
          </div>
          <div class="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p class="text-xs uppercase tracking-[0.24em] text-white/40">Visual</p>
            <p class="mt-3 text-lg font-semibold">渐变 + 玻璃拟态</p>
          </div>
          <div class="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p class="text-xs uppercase tracking-[0.24em] text-white/40">Device</p>
            <p class="mt-3 text-lg font-semibold">手机端适配</p>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>
