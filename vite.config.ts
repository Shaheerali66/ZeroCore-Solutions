import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      // Target modern browsers — enables better tree-shaking and smaller output
      target: 'es2017',
      // CSS code splitting — each route chunk gets only the CSS it needs
      cssCodeSplit: true,
      // Explicit minifier (esbuild is Vite's default but being explicit ensures it)
      minify: 'esbuild',
      rollupOptions: {
        output: {
          // ── Manual chunk splitting ────────────────────────────────────────
          // Splits vendor libraries into separate cached chunks so returning
          // visitors don't re-download unchanged vendor code on content updates.
          manualChunks: (id: string) => {
            if (id.includes('node_modules/react') ||
                id.includes('node_modules/react-dom') ||
                id.includes('node_modules/react-router-dom') ||
                id.includes('node_modules/scheduler')) {
              return 'react-vendor';
            }
            if (id.includes('node_modules/motion') ||
                id.includes('node_modules/framer-motion')) {
              return 'motion-vendor';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'lucide-vendor';
            }
            if (id.includes('node_modules/@emailjs')) {
              return 'emailjs-vendor';
            }
          },
        },
      },
    },
  };
});
