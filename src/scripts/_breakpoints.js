// 響應式斷點「單一真值」：門檻常數與 media query 字串集中此處，避免 CSS 與 JS 的判定漂移。
// 消費者：
//   1) tailwind.config.js 的 screens（CSS 前綴 m: / t: / tm: / pt: / p: / mLandscape:）→ 吃「字串」
//   2) _prototype.js 的 onDevice()（JS 裝置判斷）→ 吃「常數」與 MQ_TOUCH / MQ_SHORT_LANDSCAPE
//   3) mImg 的 picture 響應式切圖、Home/Index.vue 的手機斷點監聽 → 吃 MQ_MOBILE
//
// ⚠️ 此檔同時被 tailwind.config（Node）與瀏覽器程式（Vite）載入 → 只放「字串 / 數字」常數，
//    不得引用 window / document 等瀏覽器 API。
//
// ⚠️ 每個 MQ 字串一律以常數插值組出，不要把數字直接寫進字串 —— 常數與字串裡的數字一旦各存一份，
//    改了常數忘了改字串就靜默不一致，而 CSS 吃字串、onDevice() 吃常數，那正是「CSS 與 JS 判定漂移」的形狀。
//
// ⚠️ 改這裡的任何值都必須硬重啟 dev server：本檔被 tailwind.config.js 匯入、HMR 不重載，
//    而且會部分生效（有的前綴吃到新值、有的仍是舊值），畫面有反應卻新舊混雜。
//
// ⚠️ 括號務必配對：CSS 對清單中的無效查詢是換成 `not all`（永不命中）且不報錯。
//
// ── 判別依據：寬度 + 主要指標（pointer）──────────────────────────────────
//   本專案刻意保留觸控條件區分平板與電腦（全域骨架是純寬度）：≥ PC_MIN_WIDTH 的觸控裝置
//   （如 iPad Pro 橫放）歸平板。p 與 t / tm 的寬螢幕分支以 pointer fine / coarse 互斥。
//   代價：≥ PC_MIN_WIDTH 的觸控裝置套平板版型，而平板字級以 768 為 px→vw 分母，寬度越大整頁越放大。
//   ⚠️ pointer: none 的裝置在 ≥ PC_MIN_WIDTH 時 p 與 t 都不命中。

export const TABLET_MIN_WIDTH = 740 // 平板起始寬：< 此值為手機（對齊 CSS m / t / pt）
export const PC_MIN_WIDTH = 1025 // 電腦門檻：≥ 此值且為精準指標才算電腦（對齊 CSS p / t / tm）
// ⚠️ 門檻 ≠ 設計基準寬。設計基準寬（px→vw 字級的分母）在 config.js；這裡的數字是「幾 px 開始算另一種裝置」。
//    兩者目前剛好都是 1025，但角色不同，不要試圖統一。

// 矮橫向手機（手機橫放）：寬 ≤ SHORT_LANDSCAPE_MAX_WIDTH 且高 ≤ SHORT_LANDSCAPE_MAX_HEIGHT 歸手機。
// SHORT_LANDSCAPE_MAX_HEIGHT 同時是寬版（t / pt）要求的 min-height。
export const SHORT_LANDSCAPE_MAX_WIDTH = 999
export const SHORT_LANDSCAPE_MAX_HEIGHT = 428

// 轉向鎖定（lRotate，CSS 前綴 mLandscape）第一個分支的最小寬度：窄於此值的橫向視窗不鎖。
export const ROTATE_LOCK_MIN_WIDTH = 480

// 指標能力
export const MQ_TOUCH = '(pointer: coarse)' // 觸控為主（手指）→ 手機 / 平板（含各方向 iPad）
export const MQ_MOUSE = '(pointer: fine)' // 精準指標為主（滑鼠 / 觸控板）→ 桌機 / 筆電

// 矮橫向手機
export const MQ_SHORT_LANDSCAPE = `(max-width: ${SHORT_LANDSCAPE_MAX_WIDTH}px) and (max-height: ${SHORT_LANDSCAPE_MAX_HEIGHT}px) and (orientation: landscape)`

// 手機：矮橫向，或窄於 TABLET_MIN_WIDTH
export const MQ_MOBILE = `${MQ_SHORT_LANDSCAPE}, (max-width: ${TABLET_MIN_WIDTH - 1}px)`

// 平板：中段寬度（且不是矮橫向），或「夠寬但為觸控」的大平板
export const MQ_TABLET = `(min-width: ${TABLET_MIN_WIDTH}px) and (max-width: ${PC_MIN_WIDTH - 1}px) and (min-height: ${SHORT_LANDSCAPE_MAX_HEIGHT}px), (min-width: ${PC_MIN_WIDTH}px) and ${MQ_TOUCH}`

// 手機 + 平板：未達電腦門檻，或「夠寬但為觸控」
export const MQ_TM = `(max-width: ${PC_MIN_WIDTH - 1}px), (min-width: ${PC_MIN_WIDTH}px) and ${MQ_TOUCH}`

// 平板 + 電腦：兩者共用的「寬版」排版基底
export const MQ_PT = `(min-width: ${TABLET_MIN_WIDTH}px) and (min-height: ${SHORT_LANDSCAPE_MAX_HEIGHT}px)`

// 電腦：夠寬且為精準指標
export const MQ_DESKTOP = `(min-width: ${PC_MIN_WIDTH}px) and ${MQ_MOUSE}`

// 轉向鎖定：窄的橫向視窗，或矮的視窗
export const MQ_ROTATE_LOCK = `(max-width: ${TABLET_MIN_WIDTH - 1}px) and (orientation: landscape) and (min-width: ${ROTATE_LOCK_MIN_WIDTH}px), (max-width: ${SHORT_LANDSCAPE_MAX_WIDTH}px) and (max-height: ${SHORT_LANDSCAPE_MAX_HEIGHT}px)`
