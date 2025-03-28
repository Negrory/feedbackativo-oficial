import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
        entryFileNames: `assets/[name]-[hash]-${new Date().getTime()}.js`,
        chunkFileNames: `assets/[name]-[hash]-${new Date().getTime()}.js`,
        assetFileNames: `assets/[name]-[hash]-${new Date().getTime()}.[ext]`
      }
    }
  },
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api/sga': {
        target: 'https://api.hinova.com.br',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/sga/, '/api/sga')
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
