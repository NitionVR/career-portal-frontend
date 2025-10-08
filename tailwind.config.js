/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FACC15',
        'primary-hover': '#FBBF24',
        secondary: '#3B82F6',
        background: '#0F172A',
        card: 'rgba(15, 23, 42, 0.6)',
        text: '#F8FAFC',
        subtle: '#94A3B8',
        border: '#334155',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(16px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};