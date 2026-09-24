import CONFIG from './config.js'

import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap'
import basicSsl from '@vitejs/plugin-basic-ssl'
import vue from '@vitejs/plugin-vue'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import { defineConfig, loadEnv } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

import { imageMinimizerSharpPlugin } from './plugins/vite-plugin-image-minimizer-sharp'
import { vueSpecPlugin } from './plugins/vue-spec-plugin'
// 破快取的雜湊必須與 mImg 的 bust() 用同一支，否則同一顆種子會產出兩種值。
// 它只依賴 crypto-js、沒有瀏覽器 API，在 Node 端 import 是安全的
import { hashHex } from './src/scripts/_crypto.js'

/** spritemap 在產物內的路徑（由 sprite plugin 的 output.filename 決定，不走 assetFileNames） */
const SPRITEMAP_FILE = `${CONFIG.imgs}/svg/spritemap.svg`

/** dev 用：sprite plugin 以這個 URL 掛一條 route，必須是絕對路徑 */
const SPRITEMAP_ROUTE_URL = `/${SPRITEMAP_FILE}`

/** build 用：從 JS 產物所在目錄（CONFIG.js）換算到 spritemap 的相對路徑，mIcon 再以 import.meta.url 解析 */
const SPRITEMAP_REL = path.posix.relative(CONFIG.js, SPRITEMAP_FILE)

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

  // index.html 與 CSS 的 ?v= 破快取戳記。沿用 VITE_APP_HASH 當種子、用與 mImg 相同的 hashHex(seed, 8)，
  // 兩邊才會是同一個值（另造一顆就變成第二份真值）
  const ASSET_HASH = hashHex(process.env.VITE_APP_HASH, 8)

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
    // 部署子目錄（/portfolio）由 .env 的 VITE_APP_ROUTEPATH 交給 router 處理，base 維持 '/'，
    // 資產路徑再由下方兩支 relative-* plugin 與 renderBuiltUrl 轉成相對路徑，產物不綁死在子目錄名稱上。
    // ⚠️ 不要把子目錄改寫進 base：base 與 ROUTEPATH 兩個都設時，router 剝掉 base 後比不到任何 route，會落到 catch-all
    base: '/',
    cacheDir: 'node_modules/.vite',
    plugins: [
      vue(),
      vueSpecPlugin(),
      basicSsl(),
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
      // build / deploy：index.html 的 script / link 由「開頭斜線的絕對路徑」改成相對路徑 + ?v= 破快取。
      // index.html 輸出在產物根層，所以相對路徑 = 去掉開頭斜線。
      // ⚠️ 前綴白名單必須含 rollupOptions.output 產出的每個頂層目錄（scripts / assets）與 public 的 static，
      //    少一個，那個目錄的檔案就會留著絕對路徑、也不帶 ?v=。
      // ⚠️ 只改「開頭緊接斜線」的形式：og:url / canonical / JSON-LD 是帶網域的絕對網址，不可一起改
      // ⚠️ JS（CONFIG.js 目錄）只轉相對、不加 ?v=：路由是動態 import，Index chunk 會回頭 import 入口
      //    `./index-[hash].js`（不帶 query）。入口若以 `?v=` 載入，瀏覽器視為兩個不同的模組 → 入口執行兩次、
      //    app 掛載兩次。JS 檔名已帶 [hash]，破快取不需要 ?v=
      {
        name: 'sugarfun:relative-html-assets',
        apply: 'build',
        enforce: 'post',
        transformIndexHtml(html) {
          return html.replace(
            new RegExp(`(src|href)="\\/((?:${CONFIG.js}|assets|static)\\/[^"]+?)"`, 'g'),
            (_m, attr, target) =>
              target.startsWith(`${CONFIG.js}/`)
                ? `${attr}="${target}"`
                : `${attr}="${target}?v=${ASSET_HASH}"`
          )
        },
      },
      // build / deploy：CSS 內的 url() 以「該 CSS 產物自身所在目錄」換算相對路徑（assets/css/ → ../img/…），
      // 不能硬去掉開頭前綴，否則會解析成 assets/css/img/… 而 404。
      // regex 要求開頭斜線，data: URI 與 url(#id) 自然不會命中
      {
        name: 'sugarfun:relative-css-assets',
        apply: 'build',
        enforce: 'post',
        generateBundle(_options, bundle) {
          for (const file of Object.values(bundle)) {
            if (file.type !== 'asset' || !file.fileName.endsWith('.css')) continue
            if (typeof file.source !== 'string') continue
            const from = path.posix.dirname(file.fileName)
            file.source = file.source.replace(
              new RegExp(`url\\(('|"|)\\/((?:${CONFIG.js}|assets|static)\\/[^)'"]+)\\1\\)`, 'g'),
              (_m, q, target) => `url(${q}${path.posix.relative(from, target)}?v=${ASSET_HASH}${q})`
            )
          }
        },
      },
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
    experimental: {
      // 打包 JS 內的資產 URL（import 的圖、mImg 的 import.meta.glob）也改成相對：
      // 產出 new URL('../assets/…', import.meta.url)，以 JS 檔自身位址為基準。上面兩支 plugin 只管 index.html 與 CSS，管不到這一類。
      // spritemap 不經過這裡（它是 define 注入的字串，不是 Vite 資產），見下方 define
      renderBuiltUrl(filename, { hostType }) {
        if (hostType === 'js') return { relative: true }

        return undefined
      },
    },
    define: {
      // dev 與 build 必須是兩種值：dev 是 sprite plugin 掛的 route（必須絕對），build 是相對路徑。
      // 這裡只能注入字串（esbuild 的 define 不接受 new URL(…) 運算式），由 mIcon 以 import.meta.url 解析
      __SPRITEMAP_URL__: JSON.stringify(appMode === 'dev' ? SPRITEMAP_ROUTE_URL : SPRITEMAP_REL),
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
      // JS 轉譯底線跟隨 .browserslistrc（與 autoprefixer 的 CSS 前綴吃同一份）
      target: browserslistToEsbuild(),
      outDir: path.join(__dirname, appMode),
      rollupOptions: {
        output: {
          manualChunks: undefined,
          // 保留 [hash]：這是 JS 唯一的破快取手段 —— relative-html-assets 刻意不替 JS 加 ?v=（理由見該 plugin），
          // 動態 import 的 chunk 也不經過 index.html
          entryFileNames: `${CONFIG.js}/[name]-[hash].js`,
          chunkFileNames: `${CONFIG.js}/[name]-[hash].js`,
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
              return `assets/font/[name].[hash][extname]`
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
