import { onMounted, onUnmounted, ref } from 'vue';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function readTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return systemPrefersDark() ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export function useTheme() {
  const theme = ref<Theme>('light');

  const setTheme = (next: Theme) => {
    theme.value = next;
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  };

  const toggle = () => setTheme(theme.value === 'dark' ? 'light' : 'dark');

  let media: MediaQueryList | null = null;
  const onSystem = (e: MediaQueryListEvent) => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const next: Theme = e.matches ? 'dark' : 'light';
    theme.value = next;
    applyTheme(next);
  };

  onMounted(() => {
    theme.value = readTheme();
    applyTheme(theme.value);
    media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', onSystem);
  });

  onUnmounted(() => {
    media?.removeEventListener('change', onSystem);
  });

  return { theme, toggle };
}
