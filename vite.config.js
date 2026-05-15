


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('react-router')) return 'vendor-router';
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('scheduler')) return 'vendor-react';
          if (id.includes('gsap') || id.includes('@gsap')) return 'vendor-gsap';
          if (id.includes('lucide-react')) return 'vendor-lucide';
          if (id.includes('convex')) return 'vendor-convex';
          if (id.includes('@vercel')) return 'vendor-vercel';
          if (id.includes('react-helmet')) return 'vendor-helmet';
          return 'vendor';
        },
      },
    },
  },
  esbuild: {
    legalComments: 'none',
  },
});
