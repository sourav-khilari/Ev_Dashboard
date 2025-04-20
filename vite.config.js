// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [react(),tailwindcss(),],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
//   server: {
//     fs: {
//       strict: true,
//     },
//   },
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    outDir: 'dist',
  },
});
