export default {
  port: 2026,
  ieVersion: 0, // 10 或 0
  desktopMinWidth: 1025,
  mobileMaxWidth: 740,
  basicMobileWidth: 375,
  https: true,
  ws: 'ip',
  docker: true,
  rootDirectory: null,
  js: 'scripts',
  css: 'assets/css',
  imgs: 'assets/img',
  svg: '_svg',
  fonts: 'assets/fonts',
  /** @type {Record<string, ProxyOptions>} */
  proxy: {
    '/init': {
      target: 'VITE_APP_APIPATH',
      changeOrigin: true,
    },
    '/status/site': {
      target: 'VITE_APP_APIPATH',
      changeOrigin: true,
    },
    '/status/game': {
      target: 'VITE_APP_APIPATH',
      changeOrigin: true,
    },
    '/game': {
      target: 'VITE_APP_APIPATH',
      changeOrigin: true,
    },
    '/register': {
      target: 'VITE_APP_APIPATH',
      changeOrigin: true,
    },
    '/tag': {
      target: 'VITE_APP_APIPATH',
      changeOrigin: true,
    },
  },
}
