<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router';
import ThemeToggle from './components/ThemeToggle.vue';

const route = useRoute();
</script>

<template>
  <div class="relative min-h-[100dvh] bg-canvas text-ink">
    <a href="#main" class="skip-link">跳到内容</a>

    <header class="site-header sticky top-0 z-10 border-b border-line">
      <div class="mx-auto flex h-full w-full max-w-page items-center justify-between gap-6 px-4 sm:px-8">
        <RouterLink to="/" class="shrink-0 text-[15px] font-medium tracking-wide text-ink transition hover:text-accent">
          cheng lei
        </RouterLink>

        <nav class="flex items-center gap-6 text-[15px]" aria-label="主导航">
          <RouterLink
            to="/"
            class="whitespace-nowrap transition hover:text-accent"
            :class="route.path === '/' ? 'text-ink' : 'text-muted'"
          >
            首页
          </RouterLink>
          <RouterLink
            to="/tools"
            class="whitespace-nowrap transition hover:text-accent"
            :class="route.path === '/tools' ? 'text-ink' : 'text-muted'"
          >
            前端工具
          </RouterLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>

    <main id="main" class="mx-auto w-full max-w-page px-4 pb-24 sm:px-8">
      <RouterView />
    </main>

    <footer class="border-t border-line">
      <div class="mx-auto flex w-full max-w-page items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:px-8">
        <p>程垒</p>
        <p>个人站点</p>
      </div>
    </footer>

    <div class="grain" aria-hidden="true"></div>
  </div>
</template>
