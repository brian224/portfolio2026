import plugin from 'tailwindcss/plugin'
import CONFIG from './config.js'

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
        raw: `(max-width: 739px) and (orientation: landscape) and (min-width: 480px), (max-width: 999px) and (max-height: 428px) and (orientation: landscape) and (min-width: 480px)`,
      },
      m: {
        raw: `(max-width: 999px) and (max-height: 428px) and (orientation: landscape), (max-width: ${CONFIG.mobileMaxWidth - 1}px)`,
      },
      t: {
        raw: `(min-width: ${CONFIG.mobileMaxWidth}px) and (max-width: 1024px) and (min-height: 428px),(min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5)`,
      },
      tm: {
        raw: '(max-width: 1024px), (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5)',
      },
      pt: { raw: `(min-width: ${CONFIG.mobileMaxWidth}px) and (min-height: 428px)` },
      pMin: { min: '1024px', max: `${CONFIG.desktopMinWidth}px` },
      p: { raw: `(min-width: ${CONFIG.desktopMinWidth}px)` },
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
