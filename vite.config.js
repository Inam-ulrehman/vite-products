import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          dependencies: [
            '@ant-design/icons',
            '@reduxjs/toolkit',
            'antd',
            'axios',
            'js-cookie',
            'react',
            'react-dom',
            'react-query',
            'react-redux',
            'react-router-dom',
            'styled-components',
          ],
        },
      },
    },
  },
})
