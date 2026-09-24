export default {
  port: 2026,
  ieVersion: 0, // 10 或 0
  desktopMinWidth: 1025,
  mobileMaxWidth: 740,
  basicMobileWidth: 375,
  https: true,
  ws: 'ip',
  // 本案不走容器部署（沒有 src/docker/，改由 GitHub Actions 發布）
  docker: false,
  rootDirectory: null,
  js: 'scripts',
  css: 'assets/css',
  imgs: 'assets/img',
  svg: '_svg',
  fonts: 'assets/fonts',
  /**
   * dev server 的 API 代理。本案沒有後端，維持空物件。
   *
   * ⚠️ 不要改成 null 或整個刪掉 —— vite.config.js 的 proxy() 會對它跑
   * Object.keys()，undefined 會直接讓建置失敗。
   *
   * @type {Record<string, ProxyOptions>}
   */
  proxy: {},
}
