import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

import CONFIG from './config.js'
import { vueSpecPlugin } from './plugins/vue-spec-plugin'

export default defineConfig({
  // vueSpecPlugin 不可省：載入帶 <spec> 區塊的 .vue 會 parse 失敗
  plugins: [vue(), vueSpecPlugin()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/scripts/**', 'src/stores/**'],
      exclude: ['src/scripts/_env.js', 'src/stores/index.js'],
    },
  },
  resolve: {
    // 必須與 vite.config.js 的 resolve.alias、jsconfig.json 的 paths 三處一致
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
      '@router': fileURLToPath(new URL('src/router', import.meta.url)),
      '@stores': fileURLToPath(new URL('src/stores', import.meta.url)),
      '@components': fileURLToPath(new URL('src/components', import.meta.url)),
      '@views': fileURLToPath(new URL('src/views', import.meta.url)),
      '@imgs': path.resolve(process.cwd(), `src/${CONFIG.imgs}`),
      '@css': path.resolve(process.cwd(), `src/${CONFIG.css}`),
      '@js': path.resolve(process.cwd(), `src/${CONFIG.js}`),
    },
  },
})
