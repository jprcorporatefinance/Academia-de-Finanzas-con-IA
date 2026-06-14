/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta premium: azul profundo + dorado + verde valor
        ink: {
          950: '#070b14',
          900: '#0b1120',
          800: '#111a2e',
          700: '#1a2740',
          600: '#243453',
        },
        gold: {
          50: '#fbf6e9',
          100: '#f5e9c4',
          200: '#ecd58c',
          300: '#e3c156',
          400: '#d4af37', // dorado principal
          500: '#b8932a',
          600: '#94741f',
        },
        value: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        danger: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(212, 175, 55, 0.35)',
        card: '0 10px 40px -15px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
