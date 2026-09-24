import {
  MQ_SHORT_LANDSCAPE,
  MQ_TOUCH,
  PC_MIN_WIDTH,
  TABLET_MIN_WIDTH,
} from './_breakpoints.js'

// 取得裝置類別（與 tailwind.config.js 的 m / t / p 斷點同源，門檻與 MQ 字串都來自 _breakpoints.js）
// 策略：以寬度為主，並用 (pointer: coarse) 修正「寬螢幕觸控裝置」（如 iPad Pro 橫向）。
export const onDevice = () => {
  const width = window.innerWidth
  const mq = (query) =>
    typeof window.matchMedia === 'function' ? window.matchMedia(query).matches : false

  const isTouch = mq(MQ_TOUCH) // 主要輸入為觸控（手機 / 平板）
  const isPhoneLandscape = mq(MQ_SHORT_LANDSCAPE) // 矮的橫向手機

  // 手機：窄寬度，或矮的橫向手機
  if (width < TABLET_MIN_WIDTH || isPhoneLandscape) {
    return 'm'
  }
  // 桌機：夠寬且為精準指標（滑鼠 / 觸控板）
  if (width >= PC_MIN_WIDTH && !isTouch) {
    return 'p'
  }
  // 其餘為平板：中段寬度，或「夠寬但為觸控」的大平板（如 iPad Pro 橫向）
  return 't'
}
