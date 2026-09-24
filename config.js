export default {
  port: 2026,
  // ⚠️ 以下是「設計基準寬」＝ px→vw 字級的分母，不是斷點門檻。
  //    門檻（幾 px 開始算平板 / 電腦）的單一真值在 src/scripts/_breakpoints.js。
  desktopMinWidth: 1025, // 桌機設計基準寬（vmp 字級、pMin / pMax 用）
  basicMobileWidth: 375, // 手機設計基準寬（vmm / vmmls 字級用）
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
