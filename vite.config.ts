import { defineConfig } from 'vite'
import path from 'path';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
})
