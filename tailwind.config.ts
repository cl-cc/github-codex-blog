import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--bg)',
        elevated: 'var(--bg-elevated)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        'accent-fg': 'var(--accent-fg)',
      },
      borderRadius: {
        sm: '8px',
        DEFAULT: '12px',
        md: '12px',
        lg: '12px',
      },
      fontFamily: {
        sans: [
          '"Outfit Variable"',
          'Outfit',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Noto Sans SC"',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
      },
      maxWidth: {
        page: '1400px',
      },
    },
  },
  plugins: [],
} satisfies Config
