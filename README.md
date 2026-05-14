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

Tailwind CSS 自訂斷點，class 前綴對應裝置：

| 前綴  | 裝置        | 寬度範圍        |
| ----- | ----------- | --------------- |
| `m:`  | 手機        | ≤ 999px         |
| `t:`  | 平板        | 1000px – 1024px |
| `p:`  | 桌機        | ≥ 1025px        |
| `tm:` | 手機 + 平板 | ≤ 1024px        |
| `pt:` | 平板 + 桌機 | ≥ 1000px        |

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

| 指令             | 輸出目錄  | 說明                       |
| ---------------- | --------- | -------------------------- |
| `npm run build`  | `build/`  | 生產環境，移除所有 console |
| `npm run deploy` | `deploy/` | 部署環境                   |

靜態資源路徑基底為 `/portfolio/`。

## 圖片最佳化

建置時透過自訂 Vite 外掛（Sharp + SVGO）自動壓縮：

- **JPEG** — quality 75，mozjpeg progressive
- **PNG** — quality 80，最大壓縮等級
- **SVG** — SVGO multipass 壓縮，排除 spritemap

