<script setup></script>

<spec lang="md">
# lFooter

作品集網站的固定頁尾，顯示版權聲明文字。

## Props

無。

## 定位（各裝置）

| 裝置 | 定位方式 | 位置 |
|------|----------|------|
| 手機（`m:`） | `fixed` | 緊貼底部，藍底（`#5894DD`）加上下內距 |
| 平板（`t:`） | `absolute` | 距底部 5px |
| 桌機（`p:`） | `absolute` | 緊貼底部 |

## 層級

`z-[4]`，高於 `lHeader`（`z-[3]`），確保手機版頁尾不被頁首蓋住。
</spec>

<template>
  <footer
    class="l-footer z-[4] w-full text-center m:fixed m:bottom-0 m:bg-[#5894DD] m:py-[5px] t:bottom-[5px] pt:absolute p:bottom-0"
  >
    <ul class="flex items-center justify-center m:flex-wrap">
      <li class="tracking-[1px] text-[#fff] tm:px-[6px] tm:text-[10px] p:px-[9px] p:text-[14px]">
        © 2026 Brian Lin. Portfolio Site.
      </li>
    </ul>
  </footer>
</template>

<style lang="postcss"></style>