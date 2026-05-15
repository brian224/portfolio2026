<script setup></script>

<spec lang="md">
# lRotate

手機橫置時顯示的鎖定遮罩，提示使用者轉回直式。

## 行為

- 預設 `hidden`，不佔版面
- 當裝置進入 `mLandscape` 斷點（手機橫置）時：
  - `l-wrap`（主要內容）隱藏
  - `l-lock` 以 `fixed inset-0` 覆蓋全螢幕，顯示提示文字
- 同時將 `html / body` 字體切換為橫式縮放尺寸（`text-vmmls`）

## 斷點定義（tailwind.config.js）

```
mLandscape: (max-width: 739px) and (orientation: landscape) and (min-width: 480px)
          , (max-width: 999px) and (max-height: 428px)
```

## 使用方式

在 `App.vue` 根層級放置一次，不需傳入任何 props。
`Rotate` 須置於 `l-wrap` 之外，確保橫置時隱藏主內容後遮罩仍可顯示。
</spec>

<template>
  <div class="l-lock">
    <div class="l-lock-bd flex h-full w-full flex-col items-center justify-center">
      <span class="text-[#fff]">請將手機轉為直式，以確保最佳體驗</span>
    </div>
  </div>
</template>

<style lang="postcss">
.l-lock {
  @apply hidden;
}

@screen mLandscape {
  html,
  body {
    @apply text-vmmls leading-[1.6em];
  }

  .l-wrap {
    @apply hidden;
  }

  .l-lock {
    @apply fixed inset-0 flex;
  }
}
</style>