


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Match an npm package by its real folder boundary so a coincidental
// substring (e.g. "convex" inside "react-something") can't pull it
// into the wrong vendor chunk.
const inPkg = (id, pkg) =>
  id.includes(`/node_modules/${pkg}/`) || id.includes(`\\node_modules\\${pkg}\\`);

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
          // Convex is dynamic-only (lazy QuoteCalculator). Leave it for Vite's
          // default chunker so it lands in the QuoteCalculator chunk and never
          // gets module-preloaded from the entry HTML.
          if (inPkg(id, 'convex')) return;
          if (inPkg(id, 'react-router') || inPkg(id, 'react-router-dom')) return 'vendor-router';
          if (inPkg(id, 'react') || inPkg(id, 'react-dom') || inPkg(id, 'scheduler')) return 'vendor-react';
          if (inPkg(id, 'gsap') || inPkg(id, '@gsap/react')) return 'vendor-gsap';
          if (inPkg(id, 'lucide-react')) return 'vendor-lucide';
          if (inPkg(id, 'react-helmet-async')) return 'vendor-helmet';
          return 'vendor';
        },
      },
    },
  },
  esbuild: {
    legalComments: 'none',
  },
});
