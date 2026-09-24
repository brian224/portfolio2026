# Brian Lin 作品集 2026 — 專案說明書

| 項目 | 內容 |
| --- | --- |
| 客戶 / 主辦 | Brian Lin（林子仁）個人 — 個人作品集，無外部客戶 |
| 執行 / 製作 | Brian Lin（前端工程師；任職 方形糖創意數位 Sugarfun，來源 [index.html](index.html#L57-L60) JSON-LD `worksFor`）|
| 前端技術 | Vue 3.5（Composition API）+ Vite 7 + Pinia 2 + Vue Router 4 + Tailwind CSS 3 + PostCSS + crypto-js |
| 後端技術 | 無（純前端靜態網站，部署於 GitHub Pages）|
| 平台 / 環境 | 手機 / 平板 / 桌機 RWD 單頁式網站（SPA）；base 路徑 `/portfolio/`（[vite.config.js:62](vite.config.js#L62)）|
| 文件產生日 | 2026-06-11 |

> **文件用途**：當散落文件找不到、原始製作者已聯絡不上時，這份說明書能讓人快速掌握本專案用什麼技術、如何與使用者互動、前端如何組裝。內容皆取自原始碼，未加臆測；無法從程式碼確認者明確標示「需向相關人員確認」。

> **機密遮罩聲明**：本文件不收錄任何真實機密。本專案無 DB／後台／API key；唯一硬編碼的加解密 KEY/IV 位於 [src/scripts/_crypto.js](src/scripts/_crypto.js#L3-L4)，僅用於非敏感的圖片快取破壞雜湊（見 [§8](#sec8)），文件中以 `<已遮罩>` 呈現並僅標示位置。

> **本專案性質提醒**：這是一個**純前端、無後端、無資料庫、無行銷追蹤、無表單留資**的個人作品集網站。範本中針對「活動網站」設計的章節（後端、前後端配合、追蹤碼、活動辦法、報表）在本專案多數為「不適用」，但仍保留章節骨架並逐一註明，方便日後若擴充時對照。

---

<a id="sec0"></a>
## 0. 角色導讀

> 文件完整，不同角色不需從頭讀到尾；下表【相關章節】皆為可點擊錨點。

### 一頁式專案摘要
| 項目 | 摘要 |
| --- | --- |
| 網站定位 | 個人前端作品集網站，展示活動網頁／大型專案／早期平面與展場作品 |
| 主要轉換目標 | 讓潛在雇主 / 合作對象瀏覽作品並透過公開聯絡方式接洽（求職 / 接案）|
| 核心體驗 | 單頁 + 三區塊切換（過往作品 / 關於我 / 專長技能）+ 作品縮圖燈箱外連 |
| 主要技術 | 前端：Vue 3 + Vite 7 + Pinia + Vue Router + Tailwind；後端：無；部署：GitHub Pages（GitHub Actions）|
| 識別方式 | 無登入、無 GUID、無 token；僅以 `sessionStorage` 記住瀏覽狀態 |

### 各角色建議閱讀路線
| 角色 | 負責 / 關注的工作 | 建議先看 | 本專案是否適用 |
| --- | --- | --- | --- |
| 業務 / PM | 需求、目標、動線、時程 | [§0](#sec0)、[§1](#sec1)、[§3](#sec3) | 部分（無活動辦法 / 獎項 / 驗收留資）|
| UX / 企劃 | 使用者流程、區塊切換動線 | [§0](#sec0)、[§3](#sec3)、[§4](#sec4) | 適用 |
| UI / 視覺設計師 | 品牌色 / 字型、版面、元件狀態、RWD、素材維護 | [§0](#sec0)、[§3](#sec3)、[§4](#sec4) | 適用 |
| 前端工程師 | 頁面、區塊切換、狀態、互動、RWD、建置部署 | [§0](#sec0)、[§2](#sec2)、[§5](#sec5)、[§9](#sec9) | 適用（核心）|
| 後端工程師 | API、資料模型、加密、後台 | [§6](#sec6) | **不適用**（無後端）|
| QA / 測試 | 正常與邊界情境、單元測試 | [§3](#sec3)、[§5](#sec5)、[§9](#sec9) | 部分（有 Vitest 單元測試，無 E2E / 表單）|
| 行銷 / 數據 | 追蹤事件、漏斗、報表 | — | **不適用**（無任何追蹤碼）|
| 維運 / 交接 | 環境網域、部署、機密位置、技術債 | [§8](#sec8)、[§2](#sec2)、[§9](#sec9) | 適用 |

### 前端接手任務索引
| 我要處理的任務 | 優先查看 | 風險提醒 |
| --- | --- | --- |
| 改 / 新增作品（縮圖、連結、燈箱張數）| [§3 網站地圖](#sec3)、[§5 核心互動](#sec5)、[§9 對照表](#sec9) | 作品資料寫死在 [\_data/works.js](src/views/Home/_data/works.js#L14-L1222) 的 `datas` 陣列；圖片需依命名規則放到 `src/assets/img/home/...`，否則會顯示 404 佔位圖 |
| 改三大區塊切換 / 動線 | [§3](#sec3)、[§5 狀態管理](#sec5) | 區塊切換不是路由，而是 `globalStore.theme`；改錯會影響 `sessionStorage` 還原 |
| 改個人資料 / 經歷 / 技能文字 | [§4](#sec4)、[AboutSection.vue](src/views/Home/_components/AboutSection.vue)、[SkillSection.vue](src/views/Home/_components/SkillSection.vue) | 多為寫死在 template 的靜態文字 |
| 改 RWD / 斷點 | [§4 RWD](#sec4)、[tailwind.config.js](tailwind.config.js#L14-L45)、[config.js](config.js) | 斷點用 `(pointer: coarse/fine)` 判斷觸控 / 滑鼠，非單純寬度；hover 樣式一律掛 `p:` 前綴。改寬度需同步的位置見 [§8 常見維運操作](#sec8) |
| 改部署 / 環境 | [§5 建置與環境](#sec5)、[§7 環境網域對照](#sec7)、[§8](#sec8) | `npm run deploy` 輸出到 `dist/`（目錄名取自 `.env.deploy` 的 `VITE_APP_MODE`）；CI 部署前會先跑 lint 與測試，任一失敗就不會部署 |
| 清理剩餘殘留 | [§8 程式碼觀察事項](#sec8) | proxy、LINE LIFF 變數、`deCrypto()` 已清除；剩下未使用的設定與圖片列在 §8 |

---

<a id="sec1"></a>
## 1. 專案總覽

- **定位**：個人前端作品集（Portfolio）網站，採 SPA 單頁式設計。
- **它是什麼**：訪客進站後在同一頁面內，透過頂部 / 底部導覽切換三個區塊——
  1. **過往作品**：分「活動作品 / 專案作品 / 其他作品」三類，以縮圖牆呈現，點縮圖開作品燈箱看多張內頁圖並可外連至實際網站。
  2. **關於我**：個人照片、聯絡方式、社群連結、工作經歷、自傳。
  3. **專長技能**：技術專長與專業經歷條列。

### 關鍵人與角色
| 角色 | 對象 | 備註 |
| --- | --- | --- |
| 客戶 / 主辦 | Brian Lin 本人 | 個人專案，無外部委託方 |
| 執行 / 製作 | Brian Lin（前端工程師）| 設計、前端、部署皆同一人；任職方形糖創意數位（[index.html JSON-LD](index.html#L57-L60)）|
| 使用者 | 潛在雇主 / 合作對象 / 同業 | 無需登入，公開瀏覽 |

### 技術總覽
| 層面 | 技術 | 說明 |
| --- | --- | --- |
| 前端框架 | Vue 3.5（Composition API、`<script setup>`）| [package.json](package.json#L19) |
| 建置工具 | Vite 7 | 含自訂 SVG spritemap、影像壓縮、SSL 外掛 |
| 狀態管理 | Pinia 2 | 兩個 store：`global`（區塊 theme）、`common`（loading）|
| 路由 | Vue Router 4（`createWebHistory('/portfolio/')`）| 單一路由 `/`，其餘導回 `/`（[router/index.js](src/router/index.js#L8-L23)）|
| 樣式 | Tailwind CSS 3 + PostCSS（nesting / pxtorem / functions / calc / hexrgba / autoprefixer）| [postcss.config.js](postcss.config.js)、[tailwind.config.js](tailwind.config.js) |
| 雜湊 | crypto-js（AES）| 僅用於圖片 URL 快取破壞雜湊（[mImg.vue:47](src/components/modules/mImg.vue#L47)）|
| 程式品質 | ESLint 9（flat config）+ Prettier | `npm run lint`；含 `vue/block-order` 強制 SFC 區塊順序 `spec → script → template → style` |
| 後端 / 資料庫 | 無 | 純靜態前端 |
| 平台 / 環境 | RWD 網頁（手機 / 平板 / 桌機）| base `/portfolio/` |
| 部署 | GitHub Pages + GitHub Actions | push 到 `main` 自動 lint → 測試 → build → 部署（[deploy.yml](.github/workflows/deploy.yml)）|
| 測試 | Vitest + @vue/test-utils + jsdom | 單元測試 stores 與 scripts，含 coverage |
| 行銷追蹤 | 無 | 全專案查無 GA / Meta / Taboola / OneAD 等任何追蹤碼 |

### 倉庫結構
```
portfolio2026/
├── .github/workflows/deploy.yml   # CI/CD：lint → 測試 → build → 部署到 GitHub Pages
├── .env.dev / .env.build / .env.deploy   # 各模式環境變數
├── config.js                      # 專案參數（埠號、斷點基準寬、輸出資料夾名…）
├── vite.config.js                 # Vite 設定（alias、影像壓縮、SVG spritemap、輸出）
├── vitest.config.js               # 測試設定（alias 與 vite 一致、掛 <spec> plugin）
├── eslint.config.js               # ESLint（含 SFC 區塊順序 vue/block-order）
├── tailwind.config.js             # 斷點（pointer-based）、字級、外掛
├── postcss.config.js / postcss.function.js
├── plugins/
│   ├── vite-plugin-image-minimizer-sharp.js   # 自訂 sharp/svgo 壓縮外掛
│   └── vue-spec-plugin.js         # 把 SFC 的 <spec> 區塊轉成空模組（vite 與 vitest 共用）
├── index.html                     # HTML 樣板（OG / JSON-LD 結構化資料）
├── src/
│   ├── main.js                    # 進入點（掛 pinia / router / 全域 mIcon）
│   ├── App.vue                    # 版面骨架（Header / router-view / Footer / Rotate）
│   ├── router/index.js            # 路由（單頁）
│   ├── stores/                    # global（theme）、common（loading）
│   ├── views/Home/
│   │   ├── Index.vue              # 唯一頁面：組裝四個區塊、持有作品共用狀態
│   │   ├── _components/           # WorksSection / AboutSection / SkillSection / WorkDetail
│   │   └── _data/works.js         # 作品資料 datas
│   ├── components/
│   │   ├── layout/                # lHeader / lFooter / lRotate
│   │   └── modules/               # mImg（圖片元件）/ mIcon（SVG sprite 圖示）
│   ├── scripts/                   # _crypto.js _env.js _prototype.js（+ __tests__）
│   ├── assets/css/                # _library.css + _common/framework.css
│   ├── assets/img/                # shared/（共用）、home/（作品）、about/、skill/、n-sup/
│   └── _svg/                      # 9 個 SVG icon（spritemap 來源）
├── dist/                          # 建置輸出（已被 commit，見 §8 觀察）
└── coverage/                      # 測試覆蓋率報告（已被 commit）
```

---

<a id="sec2"></a>
## 2. 系統架構

```
┌─────────────┐     靜態檔（HTML/JS/CSS/IMG）      ┌──────────────────────┐
│  使用者瀏覽器  │  ◀───────────────────────────  │  GitHub Pages (CDN)   │
│  Vue SPA     │     base: /portfolio/            │  由 GitHub Actions 部署 │
└─────────────┘                                   └──────────────────────┘
      │
      └─ 瀏覽器端狀態：Pinia（記憶體）+ sessionStorage（theme / type / page / index）

旁路整合：無（無後端 API、無追蹤像素、無第三方 SDK 實際串接）
作品「外連」：燈箱內的 webLink 直接 target=_blank 連到各作品的正式網址（外部站台）
```

- **資料流向一句話**：使用者請求 → GitHub Pages 回傳靜態 SPA → 前端在瀏覽器內以 `globalStore.theme` 切換區塊與燈箱，所有作品資料皆內建於前端，無任何後端往返。

---

<a id="sec3"></a>
## 3. 網站設計規畫

### 目標
展示作品與個人能力，引導訪客透過公開聯絡管道（Email / 電話 / 社群）接洽。無轉換表單、無導購、無活動機制。

### 網站地圖
路由層面只有一頁；實際「頁面感」由 `globalStore.theme` 在前端切換。

| 區塊 | theme 值 | 進入方式 | 說明 |
| --- | --- | --- | --- |
| 過往作品 | `f2e`（預設）| 導覽「01. [過往作品]」/ 燈箱返回 | 三分類縮圖牆 + 分頁（[WorksSection.vue](src/views/Home/_components/WorksSection.vue)）|
| 關於我 | `about` | 導覽「02. [關於我]」| 照片、聯絡、經歷、自傳（[AboutSection.vue](src/views/Home/_components/AboutSection.vue)）|
| 專長技能 | `skill` | 導覽「03. [專長技能]」| 技術專長 / 專業經歷（[SkillSection.vue](src/views/Home/_components/SkillSection.vue)）|
| 作品燈箱 | `detail` | 點任一作品縮圖（`toDetail`）| 疊在作品區之上，看內頁圖 + 外連（[WorkDetail.vue](src/views/Home/_components/WorkDetail.vue)）|

| 路由 | 路徑 | 行為 |
| --- | --- | --- |
| 首頁（name `HomeIndex`）| `/` | 載入 [Home/Index.vue](src/views/Home/Index.vue)（lazy import）|
| 萬用 | `/:pathMatch(.*)*` | `redirect: '/'`（任何未知路徑導回首頁）|

### 使用者流程與路由守衛
- **路由守衛**：[router/index.js:25-29](src/router/index.js#L25-L29) 的 `beforeEach` 僅呼叫 `common.reset()`（把 loading 還原為 true）；`afterEach` 為空。**沒有任何進入條件 / 權限守衛**（本專案不需要）。
- **實際動線**：進站預設顯示 `f2e`（過往作品）→ 點導覽切 `about` / `skill` → 在作品區點縮圖進 `detail` 燈箱 → 燈箱「BACK」回 `f2e`。
- **作品分頁動線（平板 / 桌機）**：每頁 14 筆，左右箭頭以 `scrollLeft` 水平捲動切頁；手機則一頁顯示全部（`amount = 100`）。

### 站台 / 狀態機
| 狀態 | 由誰控制 | 值 | 說明 |
| --- | --- | --- | --- |
| 目前區塊 | `globalStore.theme` | `f2e` / `about` / `skill` / `detail` | 預設讀 `sessionStorage.theme`，否則 `f2e`（[global.js:5](src/stores/global.js#L5)）|
| 載入中 | `commonStore.isLoad` | `true` / `false` | 每次路由切換 `reset()` 為 true（[common.js](src/stores/common.js)）|
| 目前分類 | `currentType`（`Home/Index.vue` 持有）| 0 / 1 / 2 | 活動 / 專案 / 其他；存 `sessionStorage.type` |
| 目前頁碼 | `currentPage`（同上）| 數字 | 存 `sessionStorage.page` |
| 目前作品 | `currentIndex`（同上）| 數字 | 存 `sessionStorage.index` |
| 燈箱圖序 | `currentDetailIndex`（同上）| 從 1 起 | 不持久化 |

> 後四項由 `Home/Index.vue` 以 `provide('works')` 傳給 `WorksSection` 與 `WorkDetail`（見 [§5 核心互動](#sec5)）。視窗寬度跨越 740px（手機 ↔ 非手機）時自動 `sessionStorage.clear()`，避免分頁狀態污染（[Index.vue:94-106](src/views/Home/Index.vue#L94-L106)）。

### 身分識別
**不適用**。無登入 / 註冊 / 匿名 GUID / token。

### 活動辦法與獎項
**不適用**（個人作品集，無活動 / 獎項 / 抽獎 / 個資告知）。

### UX 互動流程（設計稿）
repo 內**無 Figma / 設計流程連結**。設計與決策由製作者（Brian Lin）一人完成，未記載於程式碼 → **需向製作者確認是否有設計檔可追溯**。

---

<a id="sec4"></a>
## 4. 美術與 UI 設計

### 品牌色與字型
**色票**（取自原始碼，非設計文件）：

| 色碼 | 用途 | 出處 |
| --- | --- | --- |
| `#5894DD` | 主品牌藍：全站背景、Header / Footer 底、技能小標字色 | [framework.css:7](src/assets/css/_common/framework.css#L7)、lHeader / lFooter、SkillSection |
| `#accaee` / `#acd1ee` | 淺藍：標題底線、英文強調字、小標 | 各區塊元件的 `<h2>` / `<h3>` |
| `#98cbe1` | 作品卡 / 燈箱外框 | WorksSection、WorkDetail |
| `#4e5ca5` | 作品卡 / 燈箱底色（深藍紫）| WorksSection、WorkDetail |
| `#addee3` | 空白佔位卡底色、連結 hover | WorksSection（佔位卡）、WorkDetail（連結 hover）|
| `#ffff00`（`#ff0`）| 黃色：目前選中的導覽 / 分類、「技術專長 / 專業經歷」標題 | lHeader、WorksSection、SkillSection |
| `#d5de21` | 燈箱書籤目前頁（黃綠）| WorkDetail |
| `#00adee` / `#4c82d5` | 燈箱書籤文字 / 邊框 | WorkDetail |
| 社群色 | GitHub `#333`、LinkedIn `#00649d`、IG `#ed4856`、FB `#375596` | AboutSection 社群 icon |

**字型家族**（[framework.css:3-4](src/assets/css/_common/framework.css#L3-L4)）：
`'Century Gothic', 'Noto Sans TC', '微軟正黑體', 'Microsoft JhengHei', 'Heiti TC', '黑體', Helvetica, sans-serif`

### 主視覺 KV
- **Logo**：`shared/logo.png`（[lHeader.vue:57-63](src/components/layout/lHeader.vue#L57-L63)），桌機 688×291、平板 458×194、手機 229×97。
- **Header 背景**：`shared/bg-header-p.png` 橫向平鋪（[lHeader.vue:111-113](src/components/layout/lHeader.vue#L111-L113)）。
- **關於我照片**：`about/photo.png`（手機版圓框）。

### 結果 / 狀態變化
- **作品縮圖 hover**：文字轉 `#accaee`，平滑過場 0.3s（僅桌機滑鼠，`p:hover:`）。
- **導覽 / 分類 active**：套 `.curr`，文字轉黃（`#ff0`）並 `pointer-events-none`。
- **空白格**：分頁補滿的 `null` 顯示為帶「×」線條的佔位卡（`.cross`）。
- **燈箱書籤**：目前頁 `#d5de21`、其餘白底；進場有 `showBookmark` 動畫（桌機由下滑入、手機由右滑入）。

### 各頁畫面拆解（由上而下）
- **共用版面**（[App.vue](src/App.vue#L54-L68)）：`l-wrap > main.l-body`，內含 `Header` → `router-view` → `Footer`；`Rotate` 獨立於 `l-wrap` 外。l-body 高度：手機 `100dvh`、平板固定 640px、桌機固定 960px。
- **Header**（[lHeader.vue](src/components/layout/lHeader.vue)）：Logo + 三顆導覽鈕（01 過往作品 / 02 關於我 / 03 專長技能）。手機 `fixed` 在底部、平板 / 桌機 `absolute`。
- **過往作品（f2e）**（[WorksSection.vue](src/views/Home/_components/WorksSection.vue)）：標題列「01. Works & Design 過往作品」→ 分類 Tab（活動 / 專案 / 其他）→ 縮圖牆（桌機 / 平板分頁 + 左右箭頭；手機一次列全部）。
- **關於我（about）**（[AboutSection.vue](src/views/Home/_components/AboutSection.vue)）：左欄照片 + 基本資料（姓名生日、公司、地點、Email、電話）+ 社群 icon（GitHub / LinkedIn / IG / FB）；右欄 Experience 經歷列表 + Autobiography 自傳三段。
- **專長技能（skill）**（[SkillSection.vue](src/views/Home/_components/SkillSection.vue)）：左欄「技術專長」（前端開發 / 工程化 / API 整合 / 版控 / 工具）、右欄「專業經歷」（網站開發 / 效能 / SEO / 資安 / 部署）。
- **作品燈箱（detail）**（[WorkDetail.vue](src/views/Home/_components/WorkDetail.vue)）：中央大圖（依 `PhotoCount` 逐張）+ 右側 / 底部書籤頁籤切換 + 底部外連說明（`webLink` / `webDesc`，支援多連結以逗號分隔）。
- **Footer**（[lFooter.vue](src/components/layout/lFooter.vue)）：`© 2026 Brian Lin. Portfolio Site.`。

### 響應式與裝置適配
斷點定義於 [tailwind.config.js:14-45](tailwind.config.js#L14-L45)，**以「主要指標 pointer」搭配寬度判斷**，避免寬螢幕觸控裝置（如 iPad Pro 橫向）被誤判為桌機：

| 前綴 | 對應裝置 | 條件（簡述）|
| --- | --- | --- |
| `m` | 手機 | 寬 ≤ 739px，或矮的橫向手機（≤999px 且高 ≤428px 橫向）|
| `t` | 平板 | 740–1024px 且高 ≥428px，或「≥1025px 且為觸控」的大平板 |
| `p` | 桌機 | ≥1025px **且為精準指標**（滑鼠 / 觸控板）|
| `tm` | 手機 + 平板 | ≤1024px，或「≥1025px 且觸控」|
| `pt` | 平板 + 桌機 | ≥740px 且高 ≥428px |
| `mLandscape` | 手機橫置 | 觸發 `lRotate` 鎖定遮罩 |

> JS 端對應邏輯在 [\_prototype.js `onDevice()`](src/scripts/_prototype.js#L4-L26)，回傳 `'m' / 't' / 'p'`，與上表同源（手機分頁用 `amount=100`、平板 / 桌機用 `amount=14` 即由它決定）。

> **hover 樣式一律掛 `p:` 前綴**：`p` 的條件已含 `(pointer: fine)`，觸控裝置不會留下「點過就黏住」的 hover 態。

### 跳窗 / 提示 UI
- **橫置遮罩**（[lRotate.vue](src/components/layout/lRotate.vue)）：手機橫置時隱藏主內容、全屏顯示「請將手機轉為直式，以確保最佳體驗」。
- **圖片載入失敗**（[mImg.vue](src/components/modules/mImg.vue)）：`@error` 時切換為 `image_404` SVG 佔位。
- 無 Alert / Confirm / Toast 類跳窗。

### 圖片 / 素材管線
- **`mImg.vue`**（[components/modules/mImg.vue](src/components/modules/mImg.vue)）：用 `import.meta.glob('/src/assets/img/**/*', { eager: true })` 把圖片打包進 bundle；支援
  - **響應式**：`src` 可帶 `?m=` 或物件 `{ p, m }` 提供手機版圖（`<picture><source media="(max-width:428px)">`）。
  - **lazy load**：`IntersectionObserver` 進視窗才換 `src`。
  - **快取破壞**：URL 後接 `?{hashHex(VITE_APP_HASH,8)}`（每次 build 變動）。
  - **找不到圖**：`console.warn` 並回 `shared/blank.svg`。
  - ⚠️ eager glob 會把 `src/assets/img/` 底下**所有**圖片都打包，沒被引用的圖也會出現在產物裡（見 [§8](#sec8)）。
- **SVG**：`src/_svg/*.svg` 經 `@spiriit/vite-plugin-svg-spritemap` 合併為 `assets/img/svg/spritemap.svg`，由 [mIcon.vue](src/components/modules/mIcon.vue) 以 `<use href="/portfolio{spritemap}#icon">` 引用。共 9 個 icon（見 [§9](#sec9)）。
- **建置壓縮**（[plugins/vite-plugin-image-minimizer-sharp.js](plugins/vite-plugin-image-minimizer-sharp.js)，僅 `apply: 'build'`）：JPEG q75 mozjpeg progressive、PNG q80 壓縮等級 9、SVG SVGO multipass（排除 spritemap）。

### 設計檔
repo 內無 Figma / 設計連結。→ **需向製作者（Brian Lin）確認**是否有設計檔可追溯。

---

<a id="sec5"></a>
## 5. 前端開發

### 目錄結構
見 [§1 倉庫結構](#sec1) 的 `src/` 段落。核心進入點：[main.js](src/main.js) → 掛載 `pinia`、`router`、全域註冊 `mIcon`，再 mount `#app`。

- 共用元件分兩層：`components/layout/`（版面框架 `l*`）、`components/modules/`（可複用模組 `m*`）。
- 頁面專用的區塊元件放 `views/Home/_components/`，作品資料放 `views/Home/_data/works.js`。
- 每支 `.vue` 開頭可帶 `<spec lang="md">` 區塊寫元件說明；它由 [plugins/vue-spec-plugin.js](plugins/vue-spec-plugin.js) 轉成空模組，vite 與 vitest 都必須掛這支。

### 路由與守衛
- 單頁路由（[router/index.js](src/router/index.js)）：`/`（name `HomeIndex`）→ `Home/Index.vue`（動態 import），其餘 `redirect: '/'`。`App.vue` 會把 `route.name` 掛在 `.l-wrap` 上當 class。
- `linkActiveClass: 'router-active'`、`linkExactActiveClass: 'router-exact-active'`（目前無 `<router-link>` 實際使用導覽，導覽是 theme 切換）。
- 守衛：`beforeEach` → `common.reset()`；無權限 / 條件守衛。

### 狀態管理
| Store | 檔案 | 職責 | 持久化 |
| --- | --- | --- | --- |
| `global` | [stores/global.js](src/stores/global.js) | `theme` + `changeTheme()`：切換顯示區塊 | `sessionStorage.theme` |
| `common` | [stores/common.js](src/stores/common.js) | `isLoad` + `onload()` / `reset()`：載入狀態 | 無 |

> 作品瀏覽狀態（`type` / `page` / `index` / 燈箱圖序）不在 store，由 [Home/Index.vue](src/views/Home/Index.vue) 持有，並以 `provide('works')` 傳給 `WorksSection` 與 `WorkDetail`；`type` / `page` / `index` 同步寫入 `sessionStorage`。

### API 層
**不適用**。全專案 `src/` 查無 `fetch` / `axios` / `XMLHttpRequest`。

> [config.js:17-25](config.js#L17-L25) 的 dev proxy 已清成空物件（不可刪成 `null`，`vite.config.js` 會對它跑 `Object.keys()`）；各 `.env` 的 `VITE_APP_APIPATH` 仍為空字串、未使用。

### 核心互動 / 功能
1. **區塊切換**：`global.theme` 決定顯示哪個區塊；各區塊元件自帶 `<Transition name="fade">`（`.fade-*` 樣式在 `Index.vue`）；`f2e/about/skill` 用 `v-show`，`detail` 用 `v-if`。
2. **作品資料 `datas`**：[\_data/works.js](src/views/Home/_data/works.js) 的靜態三分類陣列（活動 / 專案 / 其他），每筆欄位 `CaseName / CaseID / CaseType / CoverImg / PhotoCount / webLink / webDesc`（對照表見 [§9](#sec9)）。
3. **分頁**：`Index.vue` 的 `chunkArrayWithFill(array, size)` 將作品切成每頁 `amount` 筆並以 `null` 補滿；`WorksSection` 在桌機 / 平板用水平 `scroll-snap` + `scrollLeft` 翻頁，手機改列不分頁的完整列表。
4. **燈箱**：`WorksSection` 的 `toDetail(idx)` → `changeTheme('detail')` 並計算 `currentPage/currentIndex`；`WorkDetail` 依 `PhotoCount` 渲染內頁圖 `home/{type}/detail/{type}{id}_0{n}.png`；`webLink` 支援單 / 多連結（逗號分隔，對應各頁籤）。
5. **狀態共享**：燈箱在 DOM 上排在「關於我」「專長技能」之後，與作品列表不是父子，所以共用狀態放在 `Index.vue`，以 `provide` / `inject` 傳給兩者。四個區塊的 DOM 順序不要調動（平板 / 桌機疊在同一格、手機上下排，切換時的淡入淡出次序由它決定）。
6. **狀態還原**：`type/page/index/theme` 寫入 `sessionStorage`，重整或返回時還原並 `scrollToCurrentPage()`。
7. **裝置判斷**：`onDevice()` 決定每頁筆數；跨 740px 自動清 `sessionStorage`。

### 表單與驗證
**不適用**（站內無任何表單 / 輸入欄位）。

### 行銷追蹤
**不適用**（無任何追蹤碼；`index.html` 僅有 OG meta 與 JSON-LD 結構化資料，非追蹤）。

### 建置與環境
| 指令 | 模式 | `VITE_APP_MODE` | 輸出目錄 | 備註 |
| --- | --- | --- | --- | --- |
| `npm run dev` | dev | `dev` | —（dev server, 埠 2026, HTTPS）| 啟用 VueDevTools、basicSsl |
| `npm run build` | build | `build` | `build/` | **移除** `console` 與 `debugger`（[vite.config.js:156](vite.config.js#L156)）|
| `npm run deploy` | deploy | `dist`（由 [.env.deploy](.env.deploy#L1) 設定）| **`dist/`** | 部署用；保留 console |
| `npm run preview` | — | — | — | 預覽建置結果 |
| `npm run lint` / `lint:fix` | — | — | — | ESLint 檢查 / 自動修正；CI 部署前執行 |
| `npm run test` / `test:coverage` | — | — | — | Vitest 單元測試 / 覆蓋率 |

- **環境變數**（`.env.{mode}`）：`VITE_APP_MODE / TITLE / DESCRIPTION / URL / ROUTEPATH / APIPATH`。`VITE_APP_HASH` 於 [vite.config.js:27](vite.config.js#L27) 動態產生（`SUGARFUN_{pid}_{ppid}_{timestamp}`）供快取破壞。
- **alias**：`@ @router @stores @components @views @imgs @css @js`（[vite.config.js:141-150](vite.config.js#L141-L150)），與 [vitest.config.js](vitest.config.js)、[jsconfig.json](jsconfig.json) 三處一致。
- **樣式管線**：Tailwind + PostCSS（import / pxtorem / nesting / functions / calc / hexrgba / autoprefixer）。
- **產出檔名規則**（[vite.config.js:165-202](vite.config.js#L165-L202)）：JS `scripts/[name]-[hash].js`、CSS `assets/css/[name].[hash].css`、字型 `assets/font/`、圖片 `assets/img/` 並保留原始層級（如 `home/web/detail/web01_01.png`）。JS 保留檔名 hash 是因為本案沒有替資產加 `?v=` 的 plugin，hash 是 JS 唯一的破快取手段。

---

<a id="sec6"></a>
## 6. 後端開發

**本專案無後端 / 純前端靜態網站。**

- 無 API 端點、無資料表 / ORM、無資料庫、無後台 / 報表、無伺服器端加密。
- 唯一的「部署設定」是 GitHub Pages（見 [§7](#sec7)、[§8](#sec8)）。
- `config.js` 的 proxy 為空物件、`.env` 的 `VITE_APP_APIPATH` 為空字串，皆非實際後端（[§8](#sec8)）。

---

<a id="sec7"></a>
## 7. 前後端配合

**多數不適用**（無後端，無端到端 API 時序、無欄位對照、無錯誤碼約定）。

僅保留**環境網域對照**：

| 模式 | `VITE_APP_URL` | base | 部署目標 |
| --- | --- | --- | --- |
| dev | `https://brian224.github.io/portfolio` | `/portfolio/` | 本機 dev server（埠 2026，HTTPS）|
| build | `https://brian224.github.io/portfolio` | `/portfolio/` | 一般建置（`build/`）|
| deploy | `https://brian224.github.io/portfolio` | `/portfolio/` | GitHub Pages（`dist/`）|

> 正式網址：`https://brian224.github.io/portfolio/`（[index.html JSON-LD](index.html#L27)、canonical）。三個模式的 `VITE_APP_URL` 一致，dev 模式產出的 canonical 也指向正式站。

---

<a id="sec8"></a>
## 8. 維運與交接

### 常見維運操作
| 需求 | 怎麼做 |
| --- | --- |
| 新增 / 修改作品 | 編輯 [\_data/works.js](src/views/Home/_data/works.js#L14-L1222) 的 `datas` 陣列；縮圖放 `src/assets/img/home/{CaseType}/{CoverImg}`，內頁圖放 `.../home/{CaseType}/detail/{CaseType}{CaseID}_0{n}.png`，並設定正確 `PhotoCount`。圖片缺漏會顯示 404 佔位圖 |
| 改個資 / 經歷 / 自傳 / 技能 | 編輯 [AboutSection.vue](src/views/Home/_components/AboutSection.vue) / [SkillSection.vue](src/views/Home/_components/SkillSection.vue) 對應 template；同步 [index.html](index.html#L21-L89) 的 JSON-LD（jobTitle / 經歷 / skills）|
| 改聯絡方式 / 社群 | 編輯關於我區塊（[AboutSection.vue:51-127](src/views/Home/_components/AboutSection.vue#L51-L127)）|
| 重新部署 | push 到 `main` 分支即觸發 [GitHub Actions](.github/workflows/deploy.yml)：lint → 跑測試 → `npm run deploy` → 上傳 `./dist` → 部署 Pages |
| 本機測試 | `npm run dev`（HTTPS, 埠 2026）；`npm run lint` 跑 ESLint；`npm run test` 跑單元測試 |
| 改斷點 / 裝置判斷 | 同步修改 [config.js](config.js#L4-L6)、[tailwind.config.js](tailwind.config.js#L14-L45)（media query 字串內另有寫死的數字）、[\_prototype.js](src/scripts/_prototype.js)、[Index.vue](src/views/Home/Index.vue#L98-L102) 的 `matchMedia('(max-width: 739px)')`、[mImg.vue](src/components/modules/mImg.vue) 的 `(max-width: 428px)` |

### 機密清單（位置，值一律不收錄）
| 機密 | 存放位置 | 說明 |
| --- | --- | --- |
| AES `KEY` / `IV` | [src/scripts/_crypto.js:3-4](src/scripts/_crypto.js#L3-L4) `<已遮罩>` | **硬編碼於原始碼**。實際**僅供 `hashHex()` 產生圖片快取破壞字串**，未用於保護任何敏感資料（全專案僅 [mImg.vue](src/components/modules/mImg.vue#L47) 使用）。嚴格說非真機密，但仍列位置供接手者評估是否清理 |

> 本專案無 DB 連線、無後台帳密、無 API key、無第三方 token。

### 程式碼中觀察到、建議確認的事項
> 中立陳述「樣板殘留 / 與文件不符 / 未接線」等，不直接斷定為錯誤；交接時建議向製作者確認。

**仍待確認**

1. **`dist/` 與 `coverage/` 已 commit**：[.gitignore](.gitignore) 僅忽略 `/node_modules`、`/build`、`/dockerimage`，故建置產物 `dist/` 與測試報告 `coverage/` 被納入版控。CI 會重新 build 並上傳 `./dist`（[deploy.yml:52](.github/workflows/deploy.yml#L52)），repo 內的 `dist/` 不會被部署使用，且可能與最新原始碼不同步。（ESLint 已忽略 `coverage/`。）
2. **「專長技能」中的 API 字樣是能力宣告，非本站整合**：[SkillSection.vue:78](src/views/Home/_components/SkillSection.vue#L78) 顯示「Facebook API / LINE LIFF API / Google Maps API」——這是作品集「個人技能」展示文字，**非本 repo 實際串接**，勿誤解為本站使用這些服務。
3. **未被引用的圖片仍會被打包**：`mImg` 以 eager glob 收集 `src/assets/img/` 下所有檔案，沒被程式引用的圖也會出現在產物裡。目前確認未被引用的有 `shared/profile.png`、`about/photo.gif`、`about/photo.svg`、`skill/skill_bg.png`、`n-sup/` 的三張（chrome / edge / firefox）。作品圖（`home/`）由資料驅動，未逐一比對。
4. **專長技能區的背景設定沒有對應的背景圖**：`SkillSection` 的 `.skill-wrap` 有 `bg-center bg-no-repeat` 與桌機的 `background-size: 696px auto`，但沒有任何地方設定 `background-image`（原本的 `skill/skill_bg.png` 已停用）。
5. **`mImg` 的 `lazy=false` 不會載入圖片**：初始 `src` 為 `shared/blank.svg`，只有 IntersectionObserver 那段會換成真實路徑，`lazy=false` 會跳過它。目前全專案沒有傳 `false` 的地方。
6. **`mIcon` 的 prop 寫成 `require: true`**：正確選項是 `required`，Vue 會忽略不認得的選項，所以 `icon` 實際上不是必填。
7. **作品列表渲染兩次**：`WorksSection` 在平板 / 桌機用分頁滑軌、手機另有一份完整列表（`pt:hidden`），同一批作品在 DOM 中出現兩次。
8. **斷點門檻散在多處**：見上方「改斷點 / 裝置判斷」列出的五個位置，改門檻時要逐一同步。
9. **`/portfolio` 子路徑寫死在三處**：`vite.config.js` 的 `base`、`router/index.js` 的 `createWebHistory('/portfolio/')`、`mIcon` 的 sprite 網址。
10. **`Index.vue` 帶 UTF-8 BOM**：全專案唯一一支。
11. **桌機字級流體區只有 2px**：`pMin` 為 1024–1025px，`pMax` 從 1026px 起封頂固定 16px，`vmp` 字級 token 實際上幾乎用不到。
12. **未使用的設定**：`config.js` 的 `ws`、`rootDirectory`、`fonts` 欄位目前無程式使用；各 `.env` 的 `VITE_APP_APIPATH` 為空字串、未使用。

**已處理（原列於本節）**

- 樣板殘留：`config.js` 的 dev proxy 清成空物件、`.env` 的 LINE LIFF / OA 變數移除、未使用的 `deCrypto()` 移除（`enCrypto` 仍被 `hashHex` 使用而保留）。
- README 的部署輸出目錄與斷點表已改成與實作一致。
- `og:image` 原本串出雙重 `/portfolio/`；因沒有 1200×630 的分享圖，改為整組不放（分享時為純文字卡）。
- favicon 路徑確認沒有問題：Vite 建置時會自動加上 base，產物為 `/portfolio/static/img/favicon.ico`。
- `jsconfig.json` 的 `@container` / `@fonts` 已移除，alias 在 `vite.config.js`、`vitest.config.js`、`jsconfig.json` 三處一致。

### 聯絡資訊
網站公開顯示之製作者聯絡方式（屬網站公開內容，非機密）：

| 管道 | 內容 | 出處 |
| --- | --- | --- |
| Email | brianlin224@gmail.com | [AboutSection.vue:67](src/views/Home/_components/AboutSection.vue#L67) |
| 電話 | 0956-823-720 | [AboutSection.vue:73](src/views/Home/_components/AboutSection.vue#L73) |
| GitHub | github.com/brian224 | [AboutSection.vue:82](src/views/Home/_components/AboutSection.vue#L82) |
| LinkedIn | tw.linkedin.com/in/brianlin224 | [AboutSection.vue:94](src/views/Home/_components/AboutSection.vue#L94) |
| Instagram | instagram.com/brianlin224 | [AboutSection.vue:106](src/views/Home/_components/AboutSection.vue#L106) |
| Facebook | facebook.com/brian224 | [AboutSection.vue:118](src/views/Home/_components/AboutSection.vue#L118) |

---

<a id="sec9"></a>
## 9. 附錄

### 倉庫檔案結構（精簡）
見 [§1 倉庫結構](#sec1)。

### 關鍵常數速查
| 項目 | 值 | 出處 |
| --- | --- | --- |
| dev server 埠 | `2026` | [config.js:2](config.js#L2) |
| `desktopMinWidth` | `1025` | [config.js:4](config.js#L4) |
| `mobileMaxWidth` | `740` | [config.js:5](config.js#L5) |
| `basicMobileWidth` | `375` | [config.js:6](config.js#L6) |
| base 路徑 | `/portfolio/` | [vite.config.js:62](vite.config.js#L62) |
| 預設 theme | `f2e` | [global.js:5](src/stores/global.js#L5) |
| 桌機 / 平板每頁筆數 | `14` | [Index.vue:57](src/views/Home/Index.vue#L57) |
| 手機每頁筆數 | `100` | [Index.vue:57](src/views/Home/Index.vue#L57) |
| 正式網址 | `https://brian224.github.io/portfolio/` | [index.html:27](index.html#L27) |

### theme → 區塊對照
| theme | 區塊 | 元件 | 渲染方式 |
| --- | --- | --- | --- |
| `f2e` | 01 過往作品 | `_components/WorksSection.vue` | `v-show` + fade |
| `about` | 02 關於我 | `_components/AboutSection.vue` | `v-show` + fade |
| `skill` | 03 專長技能 | `_components/SkillSection.vue` | `v-show` + fade |
| `detail` | 作品燈箱 | `_components/WorkDetail.vue` | `v-if` + fade |

### 作品資料 `datas` 欄位對照
程式內的欄位說明在 [\_data/works.js](src/views/Home/_data/works.js) 檔頭。

| 欄位 | 說明 |
| --- | --- |
| `CaseName` | 顯示名稱（允許 `<br>`）|
| `CaseID` | 識別 ID（對應圖檔編號）|
| `CaseType` | 圖片分類：`web` / `ad` / `other` |
| `CoverImg` | 封面圖檔名，路徑 `home/{CaseType}/{CoverImg}` |
| `PhotoCount` | 燈箱內頁圖數量；內頁圖路徑 `home/{CaseType}/detail/{CaseType}{CaseID}_0{n}.png` |
| `webLink` | 外連網址（多個以 `,` 分隔；空字串＝無連結）|
| `webDesc` | 連結說明（多個以 `,` 分隔，對應各頁籤）|

### sessionStorage keys
| key | 說明 |
| --- | --- |
| `theme` | 目前區塊（f2e/about/skill/detail）|
| `type` | 目前作品分類（0/1/2）|
| `page` | 目前分頁頁碼 |
| `index` | 目前選取作品 index |

### SVG icon 清單（`src/_svg/`，spritemap 來源）
`image_404`、`ico-fb`、`ico-linkin`、`ico-github`、`ico-ig`、`ico-pin`、`ico-house`、`ico-mail`、`ico-phone`

### 環境變數對照
| 變數 | dev | build / deploy | 用途 |
| --- | --- | --- | --- |
| `VITE_APP_MODE` | `dev` | `build` / `dist` | 模式判斷、是否 drop console |
| `VITE_APP_TITLE` | `:: Brian Lin 作品集 ::` | 同左 | 標題 / OG |
| `VITE_APP_URL` | `https://brian224.github.io/portfolio` | 同左 | canonical / OG |
| `VITE_APP_APIPATH` | 空 | 空 | （未使用）|

---

> **待向製作者（Brian Lin）確認的項目**：① 是否有 Figma / 設計檔可追溯（[§3](#sec3)、[§4](#sec4)）；② `dist/` / `coverage/` 是否改為不納入版控（[§8](#sec8)）；③ [§8](#sec8)「仍待確認」的其餘各項。
