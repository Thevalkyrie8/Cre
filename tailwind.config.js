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
        // Accent resolves to the one palette (src/styles/palette.css). Neutrals
        // stay literal slate.
        engine: {
          dark: {
            background: '#0F172A', surface: '#1E293B', ink: '#FFFFFF', muted: '#94A3B8',
            action: 'var(--u-accent)', warning: 'var(--u-secondary)', border: '#334155',
          },
          light: {
            background: '#F8FAFC', surface: '#FFFFFF', ink: '#0F172A', muted: '#475569',
            action: 'var(--u-accent)', warning: 'var(--u-secondary)', border: '#E2E8F0',
          },
        },
      },
      fontFamily: {
        sans: ['Segoe UI Variable', 'Segoe UI', 'Arial', 'sans-serif'],
        editorial: ['Segoe UI Variable', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'engine-light': '0 22px 52px -34px rgba(15, 23, 42, 0.2), 0 3px 8px rgba(15, 23, 42, 0.05)',
        'engine-dark-hover': '0 16px 42px -26px rgb(from var(--u-accent) r g b / 0.32)',
        'news-card': '0 22px 52px -34px rgba(15, 23, 42, 0.2)',
        'news-card-hover': '0 16px 42px -26px rgb(from var(--u-accent) r g b / 0.32)',
      },
    },
  },
  plugins: [],
};
