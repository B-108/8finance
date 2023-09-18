import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, ''),
      '@src': resolve(__dirname, 'src/'),
      '@pages': resolve(__dirname, 'src/pages/'),
      '@components': resolve(__dirname, 'src/components/'),
      '@assets': resolve(__dirname, 'src/assets/'),
      '@themes': resolve(__dirname, 'src/themes/'),
      '@public': resolve(__dirname, 'public/'),
    }
  },

  plugins: [react(), tsconfigPaths()],
});