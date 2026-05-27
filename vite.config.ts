import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// UDS components depend on react-native-web. We alias `react-native` to the
// web build and add `.web.*` extensions so RNW's web overrides win during
// resolution. `__DEV__` is referenced by RNW internals and must be defined.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { 'react-native': 'react-native-web' },
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
  },
  define: {
    __DEV__: 'process.env.NODE_ENV !== "production"',
  },
  optimizeDeps: {
    include: [
      'react-native-web',
      '@telus-uds/components-web',
      '@telus-uds/theme-allium',
      '@telus-uds/palette-allium',
      'styled-components',
    ],
  },
})
