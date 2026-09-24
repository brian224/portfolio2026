import plugin from 'tailwindcss/plugin'
import CONFIG from './config.js'
// 裝置斷點的 MQ 字串單一真值（同時被瀏覽器端的 onDevice() 與 mImg 匯入，避免 CSS / JS 判定漂移）
import {
  MQ_DESKTOP,
  MQ_MOBILE,
  MQ_PT,
  MQ_ROTATE_LOCK,
  MQ_TABLET,
  MQ_TM,
} from './src/scripts/_breakpoints.js'

export default {
  content: ['./public/**/*.html', './public/**/*.json', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      // ── 裝置斷點：MQ 字串與門檻的單一真值在 src/scripts/_breakpoints.js（判準寫在該檔檔頭）──
      // ⚠️ 宣告順序即生成順序，衝突時後者勝，不要調換
      mLandscape: { raw: MQ_ROTATE_LOCK },
      m: { raw: MQ_MOBILE },
      t: { raw: MQ_TABLET },
      tm: { raw: MQ_TM },
      pt: { raw: MQ_PT },
      // px→vw 流體區（純寬度、不是裝置斷點；上限是 config.js 的設計基準寬）。
      // 1024 與全域骨架的字面值相同；這一段目前只有 1024–1025px 兩個像素寬（見交接文件 §8）
      pMin: { min: '1024px', max: `${CONFIG.desktopMinWidth}px` },
      p: { raw: MQ_DESKTOP },
      // px→vw 封頂：超過設計基準寬後根字級固定 16px
      pMax: { min: `${CONFIG.desktopMinWidth + 1}px` },
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
