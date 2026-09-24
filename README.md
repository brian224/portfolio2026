# Brian Lin 作品集 2026

個人前端作品集網站，採 SPA 單頁式設計，展示活動網站、廣告設計等作品。

## 專案技術

| 類別     | 套件                             |
| -------- | -------------------------------- |
| 框架     | Vue 3 (Composition API) + Vite 7 |
| 樣式     | Tailwind CSS 3 + PostCSS         |
| 狀態管理 | Pinia                            |
| 路由     | Vue Router 4                     |

## 網站頁面

單頁應用，導覽列分三個區塊：

- **[設計作品]** — 活動網頁、大型專案網站的前端作品展示，以及早期非前端 (網站設計、平面設計、展場等) 作品
- **[關於我]** — 個人簡介
- **[專長技能]** — 技術能力說明

## 響應式斷點

Tailwind CSS 自訂斷點，class 前綴對應裝置。斷點**以「主要指標 pointer」搭配寬度判斷**，
讓寬螢幕觸控裝置（如 iPad Pro 橫向）不會被當成桌機：

| 前綴            | 裝置              | 條件                                                       |
| --------------- | ----------------- | ---------------------------------------------------------- |
| `m:`            | 手機              | ≤ 739px，或矮的橫向手機（≤ 999px 且高 ≤ 428px）            |
| `t:`            | 平板              | 740–1024px 且高 ≥ 428px，或 ≥ 1025px 且為觸控              |
| `p:`            | 桌機              | ≥ 1025px **且為精準指標**（滑鼠 / 觸控板）                 |
| `tm:`           | 手機 + 平板       | ≤ 1024px，或 ≥ 1025px 且為觸控                             |
| `pt:`           | 平板 + 桌機       | ≥ 740px 且高 ≥ 428px                                       |
| `pMin:`/`pMax:` | 桌機字級流體/封頂 | 1024–1025px／≥ 1026px（根字級由 vw 改回固定 16px）         |
| `mLandscape:`   | 手機橫置          | 顯示轉向提示遮罩（`lRotate.vue`）                          |

> 完整的 media query 條件是 [tailwind.config.js](tailwind.config.js) 的 `theme.screens`，
> 門檻數值來自 [config.js](config.js)；`hover:` 一律掛 `p:` 前綴，觸控裝置才不會留下黏住的 hover 態。
> 改寬度時要連同 [\_prototype.js](src/scripts/_prototype.js) 的 `onDevice()` 一起改（目前兩邊各有一份）。

## 開發指令

```bash
# 安裝依賴
npm install

# 本地開發（HTTPS）
npm run dev

# 建置（生產環境，移除 console）
npm run build

# 建置（部署環境）
npm run deploy

# 預覽建置結果
npm run preview
```

## 建置輸出

| 指令             | 輸出目錄 | 說明                                       |
| ---------------- | -------- | ------------------------------------------ |
| `npm run build`  | `build/` | 生產環境，移除所有 console                 |
| `npm run deploy` | `dist/`  | 部署環境，GitHub Actions 發布的就是這一份  |

輸出目錄名取自各 `.env.<mode>` 的 `VITE_APP_MODE`（`.env.deploy` 填的是 `dist`），
不是指令名稱；靜態資源路徑基底為 `/portfolio/`。

## 圖片最佳化

建置時透過自訂 Vite 外掛（Sharp + SVGO）自動壓縮：

- **JPEG** — quality 75，mozjpeg progressive
- **PNG** — quality 80，最大壓縮等級
- **SVG** — SVGO multipass 壓縮，排除 spritemap

