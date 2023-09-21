import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@src', replacement: resolve(__dirname, 'src') },
      {
        find: '@components',
        replacement: resolve(__dirname, 'src/components'),
      },
    ],
  },

  plugins: [react(), tsconfigPaths()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 5173, // you can replace this port with any port
  }
});