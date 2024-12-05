/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        ripple: {
          from: { opacity: 0.75, trasform: 'scale(0)' },
          to: { opacity: 0, transform: 'scale(2)' },
        },
      },
      animation: {
        ripple: 'ripple',
      },
      fontSize: {
        xxs: 10,
      },
      transitionProperty: {
        d: 'd',
      },
    },
  },
  plugins: [],
};
