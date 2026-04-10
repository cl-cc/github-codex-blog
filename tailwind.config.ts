import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        abyss: '#060816',
        neon: '#7cf6ff',
        flare: '#ff8a5b',
        pulse: '#c084fc',
        mist: '#d8e7ff',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(124, 246, 255, 0.15), 0 24px 80px rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.95)', opacity: '0.5' },
          '100%': { transform: 'scale(1.08)', opacity: '0' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(16px, -16px, 0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseRing: 'pulseRing 3.2s ease-out infinite',
        drift: 'drift 12s ease-in-out infinite',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
