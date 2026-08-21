/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ====================================================================
        // JPR Consulting · Manual de Identidad Visual v2.0
        // Base carbón · lectura marfil · verde institucional como único acento.
        // Se conservan los NOMBRES de tokens del tema anterior (ink/gold/value/
        // danger/slate) y se remapean sus valores a la paleta JPR, de modo que
        // toda la app se re-skinea sin tocar cada componente.
        //   ink   = superficies carbón
        //   gold  = ACENTO (ahora verde institucional JPR)
        //   value = bueno (verde)
        //   danger= alerta (rojo de marca)
        //   slate = texto (marfil / acero / ceniza)
        // ====================================================================
        ink: {
          950: '#070809',
          900: '#0a0c0f', // fondo principal
          800: '#13161b', // tarjetas y superficies elevadas
          700: '#242830', // bordes
          600: '#33373d', // bordes claros / ink2
        },
        gold: {
          50: '#eef7f2',
          100: '#cbe8da',
          200: '#8fd3b7', // greenS
          300: '#2ebe8c', // greenL
          400: '#1e8f6b', // greenB — acento principal
          500: '#12614a', // green
          600: '#0e4e3b', // greenD
        },
        value: {
          400: '#2ebe8c',
          500: '#1e8f6b',
          600: '#12614a',
        },
        danger: {
          400: '#e24c3f',
          500: '#c0392b',
          600: '#a93226',
        },
        // Texto sobre carbón: marfil → acero → ceniza (cálido, de marca)
        slate: {
          100: '#f4f1ea', // ivory
          200: '#e2ded4', // lineL / lectura clara
          300: '#c7ccd4', // steel
          400: '#a6abb3', // ashD2
          500: '#8b9099', // ashD
          600: '#5f646c', // ash
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'Segoe UI', 'sans-serif'],
        serif: ['Spectral', 'Georgia', 'Cambria', 'serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'Menlo', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(30, 143, 107, 0.35)',
        card: '0 10px 40px -15px rgba(0, 0, 0, 0.55)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(30,143,107,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(30,143,107,0.04) 1px, transparent 1px)',
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
