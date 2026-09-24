<spec lang="md">
# mIcon

SVG sprite 圖示。`src/_svg/*.svg` 在建置時合併成一張 spritemap，本元件以 use 參照其中一個 symbol。
已在 `main.js` 全域註冊，各元件直接寫在 template 即可，不需 import。

## Props

| prop   | 型別   | 說明                                                   |
| ------ | ------ | ------------------------------------------------------ |
| `icon` | String | symbol id，等於 `src/_svg/` 下的檔名（不含副檔名）     |

## 行為

- `icon` 為必填（`required: true`），漏傳時 Vue 會出警告
- 外層 svg 掛 `fill-current`，顏色吃父層的 `text-*`
- 參照網址由建置期注入的 `__SPRITEMAP_URL__` 以 `import.meta.url`（這支 JS 產物自己的位址）解析後接 `#icon`：
  dev 是 sprite plugin 掛的絕對路由，build 是從 JS 產物目錄起算的相對路徑（見 `vite.config.js` 的 define），不寫死部署子目錄
</spec>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: '',
    required: true,
  },
})

// __SPRITEMAP_URL__：dev 是 sprite plugin 掛的絕對路徑，build 是從 JS 產物目錄起算的相對路徑（見 vite.config 的 define）。
// 以 import.meta.url（這支 JS 產物自己的位址）解析，不寫死部署子目錄；兩種模式共用這一行。
// 行內那個 vite-ignore 註解是必要的：spritemap 不在模組圖裡，要 runtime 才解析，不加的話每次 build 都印警告
const SPRITEMAP_URL = new URL(/* @vite-ignore */ __SPRITEMAP_URL__, import.meta.url).href

const href = computed(() => `${SPRITEMAP_URL}#${props.icon}`)
</script>

<template>
  <svg class="fill-current">
    <use :href="href" />
  </svg>
</template>
