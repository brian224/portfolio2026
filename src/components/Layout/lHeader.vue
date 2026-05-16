<script setup>
import ImgSrc from '@components/ImgSrc.vue'

import { globalStore } from '@stores/global.js'

const global = globalStore()
</script>

<spec lang="md">
# lHeader

作品集網站的固定頁首，包含 Logo 與三個區塊的導覽按鈕。

## 結構

```
header.l-header
  ├── h1.logo        Logo 圖片（ImgSrc）
  └── nav
        └── ul.menu
              ├── 01. [設計作品]  → changeTheme('f2e')
              ├── 02. [關於我]    → changeTheme('about')
              └── 03. [專長技能]  → changeTheme('skill')
```

## Props

無。

## 依賴

| 項目          | 說明                                                                             |
| ------------- | -------------------------------------------------------------------------------- |
| `globalStore` | 呼叫 `changeTheme(theme)` 切換目前顯示區塊，並掛載 `.curr` 至對應的 `.menu-link` |
| `ImgSrc`      | 響應式圖片元件，載入 `common/logo.png`                                           |

## 選取狀態

當某個區塊為目前頁面時，JS 會在對應的 `.menu-link` 上加入 `.curr` class，
樣式會將 span 文字改為黃色（`#ff0`），hover 狀態亦同。

## 尺寸（各裝置）

| 裝置         | 高度  | 定位方式                |
| ------------ | ----- | ----------------------- |
| 手機（`m:`） | 63px  | `fixed`，距底部 24px    |
| 平板（`t:`） | 126px | `absolute`，距底部 24px |
| 桌機（`p:`） | 189px | `absolute`，距底部 20px |
</spec>

<template>
  <header
    class="l-header show z-[3] w-full flex-col items-center justify-start bg-repeat-x m:fixed m:bottom-[24px] m:h-[63px] m:bg-[#5894DD] t:bottom-[24px] t:mt-[6px] t:h-[126px] pt:absolute p:bottom-[20px] p:mt-[9px] p:h-[189px]"
  >
    <h1 class="logo pointer-events-none z-[1] m:relative">
      <em class="sr-only">Brian Lin 作品集</em>
      <ImgSrc
        src="common/logo.png"
        alt="Brian Lin 作品集"
        :setClass="{
          main: 'flex-shrink-0 p:w-[688px] t:w-[458px] m:w-[229px] p:h-[291px] t:h-[194px] m:h-[97px] p:mt-[-9px] t:mt-[-6px] m:mt-[-3px]',
        }"
      />
    </h1>
    <nav
      class="absolute bottom-full w-full text-center m:bg-[#5894DD] m:py-[5px] t:mb-[6px] p:mb-[9px]"
    >
      <ul class="menu flex items-center justify-center">
        <li class="m:px-[10px] t:px-[20px] p:px-[30px]">
          <button
            class="menu-link cursor-pointer text-[#ff0] tm:text-[12px] p:text-[18px]"
            :class="global.theme === 'f2e' ? 'curr' : ''"
            @click="global.changeTheme('f2e')"
          >
            01.
            <span class="tracking-[3px] text-[#fff] transition-all duration-300 ease-in-out"
              >[設計作品]</span
            >
          </button>
        </li>
        <li class="m:px-[10px] t:px-[20px] p:px-[30px]">
          <button
            class="menu-link cursor-pointer text-[#ff0] tm:text-[12px] p:text-[18px]"
            :class="global.theme === 'about' ? 'curr' : ''"
            @click="global.changeTheme('about')"
          >
            02.
            <span class="tracking-[3px] text-[#fff] transition-all duration-300 ease-in-out"
              >[關於我]</span
            >
          </button>
        </li>
        <li class="m:px-[10px] t:px-[20px] p:px-[30px]">
          <button
            class="menu-link cursor-pointer text-[#ff0] tm:text-[12px] p:text-[18px]"
            :class="global.theme === 'skill' ? 'curr' : ''"
            @click="global.changeTheme('skill')"
          >
            03.
            <span class="tracking-[3px] text-[#fff] transition-all duration-300 ease-in-out"
              >[專長技能]</span
            >
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="postcss">
.l-header {
  background-image: url('@imgs/common/bg-header-p.png');
  background-size: auto 100%;

  &.show {
    @apply flex;
  }
}

.menu-link {
  &.curr {
    @apply pointer-events-none;

    span,
    &:hover span {
      @apply text-[#ff0];
    }
  }

  &:hover span {
    @apply text-[#accaee];
  }
}
</style>

