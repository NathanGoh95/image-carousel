/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {},
      boxShadow: {
        'glow-dark': '0 0 10px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3)',
        'glow-light': '0 0 10px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
