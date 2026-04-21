<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2026-04-10 10:28:59
 * @LastEditors: 程
 * @LastEditTime: 2026-04-21 09:33:03
-->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen overflow-hidden bg-abyss text-white relative">
    <video src="/src/assets/bg.mp4" poster="/src/assets/bg.webp" autoplay loop muted class="absolute inset-0 w-full h-full object-cover"></video>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,246,255,0.18),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(192,132,252,0.18),_transparent_24%),radial-gradient(circle_at_50%_80%,_rgba(255,138,91,0.2),_transparent_26%)]" />
    <div class="absolute inset-0 bg-grid bg-[size:42px_42px] opacity-20" />
    <div class="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl animate-drift" />
    <div class="absolute right-[-6rem] top-1/3 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl animate-float" />
    <div class="absolute bottom-[-8rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-400/20 blur-3xl animate-drift" />

    <main class="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-16 pt-6 sm:px-8 lg:px-10">
      <header class="flex flex-wrap items-center justify-between gap-4 rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
        <RouterLink to="/" class="transition hover:opacity-90">
          <p class="font-display text-2xl uppercase tracking-[0.25em] text-neon sm:text-3xl">cheng lei</p>
        </RouterLink>
        <nav class="flex flex-wrap items-center gap-4 text-sm text-white/70 md:gap-6">
          <RouterLink to="/" class="transition hover:text-white">首页</RouterLink>
          <!-- <a href="/#categories" class="transition hover:text-white">分类宇宙</a> -->
          <!-- <a href="/#highlights" class="transition hover:text-white">内容亮点</a> -->
          <!-- <a href="/#stack" class="transition hover:text-white">技术栈</a> -->
          <RouterLink to="/tools" class="transition hover:text-white">前端工具</RouterLink>
        </nav>
      </header>

      <RouterView />
    </main>
  </div>
</template>
