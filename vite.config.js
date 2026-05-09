import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
          'vendor-gsap':   ['gsap', '@gsap/react'],
          'vendor-ui':     ['lucide-react', 'react-helmet-async'],
          'vendor-convex': ['convex'],
        },
      },
    },
  },
});
