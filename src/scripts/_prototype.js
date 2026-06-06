// 取得裝置類別（與 tailwind.config.js 的 m / t / p 斷點對齊）
// 策略：以寬度為主，並用 (pointer: coarse) 修正「寬螢幕觸控裝置」（如 iPad Pro 橫向）。
// iPadOS 主指標恆為 coarse，可穩定辨識各方向 iPad，故不再依賴脆弱的 UA 嗅探與 orientation。
export const onDevice = () => {
  const mobileMaxWidth = 740 // 對應 CONFIG.mobileMaxWidth
  const desktopMinWidth = 1025 // 對應 CONFIG.desktopMinWidth
  const width = window.innerWidth
  const mq = (query) =>
    typeof window.matchMedia === 'function' ? window.matchMedia(query).matches : false

  const isTouch = mq('(pointer: coarse)') // 主要輸入為觸控（手機 / 平板）
  const isPhoneLandscape = mq(
    '(max-width: 999px) and (max-height: 428px) and (orientation: landscape)'
  ) // 矮的橫向手機

  // 手機：窄寬度，或矮的橫向手機
  if (width < mobileMaxWidth || isPhoneLandscape) {
    return 'm'
  }
  // 桌機：夠寬且為精準指標（滑鼠 / 觸控板）
  if (width >= desktopMinWidth && !isTouch) {
    return 'p'
  }
  // 其餘為平板：中段寬度（740–1024），或「夠寬但為觸控」的大平板（如 iPad Pro 橫向）
  return 't'
}
