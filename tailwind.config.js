/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  prefix: 'tw-',
  corePlugins: {
    // The project already owns its global reset and base styles.
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        engine: {
          dark: {
            background: '#0F172A', surface: '#1E293B', ink: '#FFFFFF', muted: '#94A3B8',
            action: '#22D3EE', warning: '#FBBF24', border: '#334155',
          },
          light: {
            background: '#F8FAFC', surface: '#FFFFFF', ink: '#0F172A', muted: '#475569',
            action: '#0284C7', warning: '#EA580C', border: '#E2E8F0',
          },
        },
      },
      fontFamily: {
        sans: ['Segoe UI Variable', 'Segoe UI', 'Arial', 'sans-serif'],
        editorial: ['Segoe UI Variable', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'engine-light': '0 22px 52px -34px rgba(15, 23, 42, 0.2), 0 3px 8px rgba(15, 23, 42, 0.05)',
        'engine-dark-hover': '0 16px 42px -26px rgba(34, 211, 238, 0.32)',
        'news-card': '0 22px 52px -34px rgba(15, 23, 42, 0.2)',
        'news-card-hover': '0 16px 42px -26px rgba(34, 211, 238, 0.32)',
      },
    },
  },
  plugins: [],
};
