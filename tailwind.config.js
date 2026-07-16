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
      fontFamily: {
        editorial: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      boxShadow: {
        'news-card': '0 24px 80px -34px rgba(0, 0, 0, 0.95)',
        'news-card-hover': '0 30px 90px -34px rgba(66, 153, 225, 0.34)',
      },
    },
  },
  plugins: [],
};
