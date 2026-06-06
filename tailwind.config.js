import plugin from 'tailwindcss/plugin'
import CONFIG from './config.js'

// 裝置「輸入能力」媒體特性：以「主要指標」區分觸控與精準指標，比螢幕寬度更能反映真實裝置類別。
// iPadOS 上主指標恆為 coarse（即使外接滑鼠/鍵盤亦然），因此可穩定辨識各方向 iPad，
// 並取代原本針對 iPad Pro 的 -webkit-min-device-pixel-ratio hack。
// 參考：MDN @media/pointer、web.dev/learn/design/interaction
const TOUCH = '(pointer: coarse)' // 觸控為主（手指）→ 手機 / 平板（含各方向 iPad、Android 平板）
const MOUSE = '(pointer: fine)' // 精準指標為主（滑鼠 / 觸控板）→ 桌機 / 筆電（含觸控筆電的鍵盤模式）

export default {
  content: ['./public/**/*.html', './public/**/*.json', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      notsupport: {
        raw:
          CONFIG.ieVersion === 0
            ? 'screen and (min-width: 0\\0)'
            : '\\0screen\\, screen\\9, all and (min-width: 0\\0) and (min-resolution: 0.001dpcm)',
      },
      mLandscape: {
        raw: `(max-width: 739px) and (orientation: landscape) and (min-width: 480px), (max-width: 999px) and (max-height: 428px)`,
      },
      m: {
        raw: `(max-width: 999px) and (max-height: 428px) and (orientation: landscape), (max-width: ${CONFIG.mobileMaxWidth - 1}px)`,
      },
      // 平板：中段寬度，或「夠寬但為觸控」的大平板（如 iPad Pro 橫向 1366px）。
      // 後段以 (pointer: coarse) 取代原本針對 iPad Pro 的 DPR/orientation hack，更穩定且涵蓋各方向。
      t: {
        raw: `(min-width: ${CONFIG.mobileMaxWidth}px) and (max-width: ${CONFIG.desktopMinWidth - 1}px) and (min-height: 428px), (min-width: ${CONFIG.desktopMinWidth}px) and ${TOUCH}`,
      },
      // 平板 + 手機（全觸控情境）：中段以下寬度，或「夠寬但為觸控」的大平板
      tm: {
        raw: `(max-width: ${CONFIG.desktopMinWidth - 1}px), (min-width: ${CONFIG.desktopMinWidth}px) and ${TOUCH}`,
      },
      pt: { raw: `(min-width: ${CONFIG.mobileMaxWidth}px) and (min-height: 428px)` },
      pMin: { min: '1024px', max: `${CONFIG.desktopMinWidth}px` },
      // 桌機：夠寬且為精準指標（滑鼠 / 觸控板）→ 寬螢幕觸控裝置不會被誤判為桌機
      p: { raw: `(min-width: ${CONFIG.desktopMinWidth}px) and ${MOUSE}` },
      pMax: { min: `${CONFIG.desktopMinWidth + 1}px` },
      firefox: {
        raw: '(min--moz-device-pixel-ratio:0) and (display-mode:browser), (min--moz-device-pixel-ratio:0) and (display-mode:fullscreen)',
      },
      IE: { raw: 'screen and (-ms-high-contrast:active), (-ms-high-contrast:none)' },
    },
    fontSize: {
      vmp: `${(16 / CONFIG.desktopMinWidth) * 100}vw`,
      vmt: `${(14 / 768) * 100}vw`,
      vmm: `${(16 / CONFIG.basicMobileWidth) * 100}vw`,
      vmmls: `${((16 / CONFIG.basicMobileWidth) * 100) / 1.77}vw`,
    },
    extend: {
      content: {
        default: "''",
      },
      transitionProperty: {
        heights: 'height, max-height',
        widths: 'width, max-width',
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      const truncateMultiline = {}
      for (let i = 2; i <= 5; i += 1) {
        truncateMultiline[`.truncate-${i}`] = {
          display: '-webkit-box;',
          '-webkit-line-clamp': `${i}`,
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        }
      }
      addComponents(truncateMultiline)
      addComponents({
        '.imeMode-disabled': { 'ime-mode': 'disabled' },
      })
    }),
  ],
}
