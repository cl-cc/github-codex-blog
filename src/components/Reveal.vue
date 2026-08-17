<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    delay?: number;
  }>(),
  { delay: 0 }
);

const root = ref<HTMLElement | null>(null);
const visible = ref(false);
let io: IntersectionObserver | null = null;

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    visible.value = true;
    return;
  }

  io = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        visible.value = true;
        io?.disconnect();
      }
    },
    { threshold: 0.18 }
  );

  if (root.value) io.observe(root.value);
});

onUnmounted(() => io?.disconnect());
</script>

<template>
  <div
    ref="root"
    class="reveal"
    :class="{ 'is-in': visible }"
    :style="{ transitionDelay: `${props.delay}ms` }"
  >
    <slot />
  </div>
</template>
