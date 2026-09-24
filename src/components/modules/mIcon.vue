<spec lang="md">
# mIcon

SVG sprite 圖示。`src/_svg/*.svg` 在建置時合併成一張 spritemap，本元件以 use 參照其中一個 symbol。
已在 `main.js` 全域註冊，各元件直接寫在 template 即可，不需 import。

## Props

| prop   | 型別   | 說明                                                   |
| ------ | ------ | ------------------------------------------------------ |
| `icon` | String | symbol id，等於 `src/_svg/` 下的檔名（不含副檔名）     |

## 行為

- 外層 svg 掛 `fill-current`，顏色吃父層的 `text-*`
- 參照網址是 `/portfolio` 前綴 + 建置期注入的 `__SPRITEMAP_URL__` + `#icon`
</spec>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: '',
    require: true,
  },
})

const href = computed(() => `/portfolio${__SPRITEMAP_URL__}#${props.icon}`)
</script>

<template>
  <svg class="fill-current">
    <use :href="href" />
  </svg>
</template>
