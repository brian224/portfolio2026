/**
 * 把 SFC 的 `<spec lang="md">` 自訂區塊轉成空模組。
 *
 * ⚠️ dev(vite.config.js)與單元測試(vitest.config.js)**都必須掛這支**——
 * 少掛一邊，載入帶 `<spec>` 的 .vue 就會 parse 失敗。
 */
export function vueSpecPlugin() {
  return {
    name: 'vue-spec-plugin',
    transform(code, id) {
      if (id.includes('?vue&type=spec')) {
        return { code: 'export default {}' }
      }
    },
  }
}
