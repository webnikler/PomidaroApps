export default {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/app/styles/index.css',
  tailwindConfig: './tailwind.config.js',
  singleQuote: true,
  jsxSingleQuote: true,
  arrowParens: 'always',
  'max-len': ['error', 140, 2],
  tabWidth: 2,
  useTabs: false,
};
