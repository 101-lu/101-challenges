import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import autoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  resolve: {
    alias: { src: '/src', app: '/src/app' },
  },
  plugins: [
    react(),
    autoImport({
      include: [/\.[tj]sx?$/],
      dts: './src/auto-imports.d.ts',
      imports: [{ react: [['default', 'React']], clsx: [['clsx', 'cx']] }],
    }),
  ],
})
