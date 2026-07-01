import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Deploying to a root custom domain like https://unitrux.com
  // so assets should be loaded from the root path.
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      },
    },
  },
  server: {
    port: 5173,
    host: true,
    hmr: {
      port: 5173
    },
    watch: {
      usePolling: true
    },
    proxy: {
      '/api': {
        target: 'https://unitrux-api.up.railway.app',
        changeOrigin: true,
        secure: true,
        timeout: 10000, // 10 second timeout
        proxyTimeout: 10000
      }
    }
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: []
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('development')
  }
})
