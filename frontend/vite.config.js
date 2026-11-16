import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: ruta donde vive el sitio.
//   - GitHub Pages (npm run build, lo que usa el deploy automático): '/Mextexsab/'
//   - Neubox, en la raíz del dominio o de un subdominio (npm run build:neubox): '/'
export default defineConfig(({ mode }) => ({
  base: mode === 'neubox' ? '/' : '/Mextexsab/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false
      }
    }
  }
}));
