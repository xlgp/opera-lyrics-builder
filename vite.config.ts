import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/opera-lyrics-builder/',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dts: true,
      dirs: ['src/components', 'src/views'],
      resolvers: [
        ElementPlusResolver()]
    })],
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version)
  }
})
