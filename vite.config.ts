import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'testing' || process.env.NODE_ENV === 'development'
  return {
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
    ],
    build: {
      sourcemap: isDev,
      rollupOptions: {
        output: {
          entryFileNames: 'js/[name]-[hash:6].js',
          chunkFileNames: 'js/[name]-[hash:6].js',
          assetFileNames(fileInfos) {
            const imgExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']
            const name = fileInfos.names[0]
            if (name.endsWith('css')) {
              return 'css/[name]-[hash:6].css'
            } else if (imgExts.some(ext => name.endsWith(ext))) {
              return 'imgs/[name]-[hash:6].[ext]'
            } else {
              return 'assets/[name]-[hash:6].[ext]'
            }
          },
        },
        manualChunks: {
          antd: ['antd', '@ant-design/v5-patch-for-react-19'],
          axios: ['axios'],
          // il8n: ['react-i18next', 'i18next'],
          // react: ['react', 'react-dom', 'react-error-boundary'],
          react: ['react', 'react-dom'],
          tanstack: ['tanstack/react-router', 'tanstack-router-keepalive'],
        },
      },
      minify: true,
    },
    resolve: {
      alias: {
        '@': '/src',
        components: '/src/components',
        constants: '/src/constants',
        hooks: '/src/hooks',
        lib: '/src/lib',
        store: '/src/store',
        api: '/src/api',
        routes: '/src/routes',
        assets: '/src/assets',
      },
    },
    preview: {
      port: 9725,
    },
    server: {
      port: 1573,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
