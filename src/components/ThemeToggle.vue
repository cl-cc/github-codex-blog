<script setup lang="ts">
import { PhMoon, PhSun } from '@phosphor-icons/vue';
import { useTheme } from '../composables/useTheme';

const { theme, toggle } = useTheme();
</script>

<template>
  <button
    type="button"
    class="inline-flex h-9 w-9 items-center justify-center rounded-sm text-ink transition hover:bg-black/[0.05] active:scale-[0.98] dark:hover:bg-white/[0.08]"
    :aria-label="theme === 'dark' ? '切换为浅色' : '切换为深色'"
    @click="toggle"
  >
    <PhSun v-if="theme === 'dark'" :size="20" weight="regular" />
    <PhMoon v-else :size="20" weight="regular" />
  </button>
</template>
