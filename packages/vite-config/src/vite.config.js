import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const createBaseConfig = (options = {}) => defineConfig({
  build: {
    outDir: options.outDir || 'dist',
    minify: options.minify !== false,
    sourcemap: options.sourcemap || 'hidden',
    rollupOptions: {
      output: {
        manualChunks: options.manualChunks || undefined,
      },
    },
  },
  plugins: [],
  esbuild: {
    jsxInject: options.autoImportReact ? `import React from 'react'` : undefined,
  },
  optimizeDeps: {
    include: options.includeOptimizeDeps || [],
  },
  server: {
    port: options.port || 3000,
    open: options.open !== false,
  },
});

export const baseConfig = createBaseConfig();

export const webComponentConfig = createBaseConfig({
  // Add any web component specific options here
});

export const reactConfig = createBaseConfig({
  plugins: [react()],
  autoImportReact: true,
  includeOptimizeDeps: ['react', 'react-dom'],
});

export default createBaseConfig;
