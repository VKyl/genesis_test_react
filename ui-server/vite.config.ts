import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'node:path'
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/',
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@layout': path.resolve(__dirname, 'src/layout')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: Number.parseInt(process.env.UI_PORT),
    strictPort: true,
    host: true,
    origin: `http://0.0.0.0:${process.env.UI_PORT}`,
  },
})
