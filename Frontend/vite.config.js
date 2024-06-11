import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your Express server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  build: {
    rollupOptions: {
      external: [
        '@ckeditor/ckeditor5-react',
        '@ckeditor/ckeditor5-build-classic', // Add CKEditor classic build as an external dependency
      ],
    },
  },
});
