import CONFIG from './config.js'

import { existsSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap'
import basicSsl from '@vitejs/plugin-basic-ssl'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import VueDevTools from 'vite-plugin-vue-devtools'

import { imageMinimizerSharpPlugin } from './plugins/vite-plugin-image-minimizer-sharp'

const SPRITEMAP_ROUTE_URL = `/${CONFIG.imgs}/svg/spritemap.svg`

function ignoreSpecBlock() {
  return {
    name: 'ignore-spec-block',
    transform(code, id) {
      if (id.includes('?vue&type=spec')) {
        return { code: 'export default {}' }
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const appMode = env.VITE_APP_MODE || process.env.VITE_APP_MODE || mode

  process.env = {
    ...process.env,
    ...env,
    VITE_APP_HASH: `SUGARFUN_${process.pid}_${process.ppid}_${+new Date()}`,
    VITE_APP_MODE: appMode,
  }

  /**
   * 自動替換代理路徑中的環境變數
   *
   * 在 config.js 無法引用 vite 環境變數
   *
   * 故只能使用字串替代方法處理
   *
   * @example
   * VITE_APP_APIPATH => '/api'
   */
  const proxy = () => {
    const proxy = CONFIG.proxy ? {} : null

    Object.keys(CONFIG.proxy).forEach((key) => {
      const value = CONFIG.proxy[key]

      proxy[key] = value

      Object.keys(value).forEach((k) => {
        const val = value[k]

        if (/^VITE_APP_/.test(val)) {
          proxy[key][k] = process.env[val]
        }
      })
    })

    return proxy
  }

  return {
    base: '/portfolio/',
    cacheDir: 'node_modules/.vite',
    plugins: [
      vue(),
      ignoreSpecBlock(),
      basicSsl(),
      viteStaticCopy({
        targets: [
          ...(CONFIG.docker && appMode !== 'dev'
            ? [
                ...(existsSync(path.resolve(process.cwd(), `./src/docker/${appMode}`))
                  ? [
                      {
                        src: `./src/docker/${appMode}/[!.]*`,
                        dest: './',
                      },
                    ]
                  : []),
              ]
            : []),
        ],
      }),
      VitePluginSvgSpritemap(`./src/${CONFIG.svg}/*.svg`, {
        prefix: '',
        svgo: false,
        oxvg: false,
        idify: (name) => name,
        route: {
          url: SPRITEMAP_ROUTE_URL,
          name: 'assets-img-svg-spritemap',
        },
        output: {
          filename: 'img/svg/spritemap.svg',
          name: 'spritemap.svg',
          use: true,
          view: true,
        },
      }),
      imageMinimizerSharpPlugin({
        rules: [
          {
            test: /\.(jpe?g|png)$/i,
            minimizer: [
              {
                implementation: 'sharpMinify',
                options: {
                  encodeOptions: {
                    jpeg: {
                      quality: 75,
                      progressive: true,
                      mozjpeg: true,
                    },
                    png: {
                      quality: 80,
                      compressionLevel: 9,
                      adaptiveFiltering: true,
                    },
                  },
                },
              },
            ],
          },
          {
            test: /^(?!.*spritemap(?:\.[^\\/]+)?\.svg$).*\.svg$/i,
            minimizer: [
              {
                implementation: 'svgoMinify',
                options: {
                  multipass: true,
                  plugins: [{ name: 'preset-default' }, { name: 'removeViewBox', active: false }],
                },
              },
            ],
          },
        ],
      }),
      VueDevTools(),
    ],
    resolve: {
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
    define: {
      __SPRITEMAP_URL__: JSON.stringify(SPRITEMAP_ROUTE_URL),
    },
    esbuild: {
      drop: appMode === 'build' ? ['console', 'debugger'] : ['debugger'],
      // drop: ['debugger']
    },
    build: {
      assetsInlineLimit: (filePath) => {
        return !/\.(woff|woff2|eot|ttf|otf|png|jpe?g|gif|svg|webp)$/i.test(filePath)
      },
      minify: true,
      outDir: path.join(__dirname, appMode),
      rollupOptions: {
        output: {
          manualChunks: undefined,
          // entryFileNames: `${CONFIG.js}/[name].js`,
          // chunkFileNames: `${CONFIG.js}/[name].js`,
          assetFileNames: (assetInfo) => {
            const { name } = assetInfo
            if (!name) return `${CONFIG.imgs}/[name][extname]`

            // Rollup 的 assetInfo.name 是檔名（不含路徑），但 assetInfo.names[0] 或 assetInfo.originalFileNames 可能有完整路徑
            // 所以我們用 assetInfo.name 的 fallback 是 assetInfo?.sourceFilename

            // 將原始來源完整路徑（如 src/assets/img/game/index/bg.png）取出 src/assets/img/ 後面的部分
            let filePath = assetInfo.name
            if (assetInfo?.originalFileName) filePath = assetInfo.originalFileName
            else if (assetInfo?.sourceFilename) filePath = assetInfo.sourceFilename

            // 截掉 src/assets/img/ 前綴
            const relative = filePath
              .replace(/^src[\\/]/, '')
              .replace(new RegExp(`^${CONFIG.imgs}[\\/]`), '')

            if (/\.(png|jpe?g|gif|svg|webp)$/i.test(name)) {
              // 保留原始層級，例如 game/index/bg.png
              return `${CONFIG.imgs}/${relative.replace(/\.[^/.]+$/, '')}[extname]`
            } else if (name.endsWith('.css')) {
              return `${CONFIG.css}/[name].[hash][extname]`
              // return `${CONFIG.css}/[name].[extname]`
            } else if (/\.(woff|woff2|eot|ttf|otf)$/i.test(name)) {
              return `${CONFIG.fonts}/[name].[hash][extname]`
              // return `${CONFIG.fonts}/[name].[extname]`
            }
            return `${CONFIG.imgs}/[name][extname]`
          },
        },
      },
    },
    server: {
      port: CONFIG.port,
      host: '0.0.0.0',
      https: CONFIG.https,
      proxy: proxy(),
      headers: {
        'Access-Control-Allow-Origin': '*',
        // 'Cross-Origin-Opener-Policy': 'same-origin',
        // 'Cross-Origin-Embedder-Policy': 'require-corp'
      },
    },
  }
})
