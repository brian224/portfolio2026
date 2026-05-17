// 取得裝置
export const onDevice = () => {
  const angle = window.screen.orientation ? window.screen.orientation.angle : 0
  const PCMinWidth = 1024
  const mobileWidth = 740
  const userAgent = navigator.userAgent
  const isPCPad = angle === 0 && window.innerWidth > mobileWidth && window.innerWidth < PCMinWidth // 在桌機時 resize 模擬 Pad 的尺寸
  const isAndroidPad = /Android|webOS|BlackBerry/i.test(userAgent)
  const is16BelowPad = /iPad/i.test(userAgent) // ios 16 以下的系統
  const is17AbovePad = angle !== 0 && /Mac OS X/i.test(userAgent) // iso 17 以上的系統
  const isAndroidMobile = /Android|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  const isIPhoneMobile =
    (angle !== 0 && window.innerWidth > 730 && window.innerWidth < 815) || /iPhone/i.test(userAgent)

  if (window.innerWidth <= mobileWidth || isAndroidMobile || isIPhoneMobile) {
    return 'm'
  }
  if (isPCPad || isAndroidPad || is16BelowPad || is17AbovePad) {
    return 't'
  }

  return 'p'
}
