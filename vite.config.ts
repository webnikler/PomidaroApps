import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svg from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svg({
      svgrOptions: {
        svgProps: {
          fill: '{props.color || "currentColor"}',
        },
        icon: '1.25em',
      },
    }),
  ],
});
