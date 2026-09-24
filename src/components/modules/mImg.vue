<spec lang="md">
# mImg

圖片元件。專案內的圖片一律走這支，不直接寫原生 img 標籤（全域 hook `enforce-img-component` 會擋）。

## Props

| prop       | 型別             | 預設 | 說明                                                         |
| ---------- | ---------------- | ---- | ------------------------------------------------------------ |
| `src`      | String / Object  | 必填 | 相對於 `src/assets/img/` 的路徑；要手機版圖時見下方「手機圖」 |
| `alt`      | String           | null | 有給時會在後面接上網站標題（`VITE_APP_TITLE`）               |
| `lazy`     | Boolean          | true | 進入視窗才寫入真實路徑                                       |
| `setClass` | Object           | {}   | `{ main, img }`：`main` 掛在外層 figure，`img` 掛在圖片本身  |

## 路徑解析

- 本地圖：以 `import.meta.glob` 預先收集 `src/assets/img/` 下所有圖片；找不到時 console.warn 並改用 `shared/blank.svg`
- 破快取：本地圖網址加 `?{hash}`（種子 `VITE_APP_HASH`，每次建置不同）；外部 http 網址改用檔名算 hash
- `data:` / `blob:` 原樣使用

## 手機圖

`src` 傳 `{ p, m }` 物件，或在字串後加 `?m=1`（手機圖檔名自動在副檔名前插 `_m`）。
切換條件是 `(max-width: 428px)`。

## 載入

- 初始 src 是 `shared/blank.svg`，IntersectionObserver 偵測進入視窗後才換成真實路徑，另加原生 `loading="lazy"`
- 載入失敗（`@error`）時整個換成 404 佔位，顯示 mIcon 的 `image_404`
</spec>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'

import blankUrl from '@imgs/shared/blank.svg'

import { hashHex } from '@js/_crypto.js'
import { ENV } from '@js/_env.js'

// import.meta.glob 只吃字面字串（建置期靜態分析），不能用變數組路徑
const MAP = import.meta.glob('/src/assets/img/**/*', { eager: true, import: 'default' })

// 相對檔名 → glob key。前綴必須與上面那行字面一致，所以同樣寫死，不從 config.js 取
const toKey = (p) => `/src/assets/img/${p}`

// 依照你的需求：回傳 URL + ?[hash]（用 VITE_APP_HASH）
const bust = (url) => `${url}?${hashHex(import.meta.env.VITE_APP_HASH, 8)}`

const resolveBundledImg = (raw) => {
  if (!raw) return null

  // 外部/特殊
  if (/^(https?:|data:|blob:)/.test(raw)) {
    if (/^http/.test(raw)) {
      const imgName = /\/([^/?#]+)(?:\?|$)/.exec(raw)[0]
      const hasQuery = /\?/.test(raw)
      return `${encodeURI(raw)}${hasQuery ? '&' : '?'}${hashHex(imgName, 8)}`
    }
    return encodeURI(raw)
  }

  // 本地：用 glob 對映
  const hit = MAP[toKey(raw)]
  if (hit) return bust(hit)

  console.warn('[mImg] not found:', toKey(raw))
  return blankUrl // 找不到就用佔位圖
}

// ---- props & 狀態 ----
const props = defineProps({
  src: { type: [String, Object], default: null, required: true },
  alt: { type: String, default: null },
  lazy: { type: Boolean, default: true },
  setClass: { type: Object, default: () => ({}) },
})

const imageRef = ref(null)
const status = ref(200)
const as = computed(() => (status.value === 200 ? 'figure' : 'div'))
const hasLazy = computed(() => props.lazy)
const hasMobile = computed(() =>
  props.src && typeof props.src === 'object' ? true : !!/[?&#]m=[^?&#]*/.test(props.src)
)

// ---- 路徑 ----
const mobilePath = computed(() => {
  const src =
    props.src && typeof props.src === 'object' && props.src.m
      ? props.src.m
      : props.src && hasMobile.value
        ? `${/.*(?=\?.*$)/.exec(props.src)[0].replace(/.(\w+$)/, '_m.$1')}`
        : null
  return resolveBundledImg(src)
})

const path = computed(() => {
  const src =
    props.src && typeof props.src === 'object'
      ? props.src.p
      : props.src && hasMobile.value
        ? /.*(?=\?.*$)/.exec(props.src)[0]
        : props.src
  return resolveBundledImg(src)
})

// alt 要改成 VITE_APP_TITLE
const alt = computed(() =>
  props.alt
    ? props.alt !== ENV.VITE_APP_TITLE
      ? `${props.alt} || ${ENV.VITE_APP_TITLE}`
      : ENV.VITE_APP_TITLE
    : null
)

const setClass = computed(() => ({ main: '', img: '', ...props.setClass }))

// ---- lazy ----
const onEnterView = (entries, observer) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const image = entry.target
      if (path.value) image.setAttribute('src', path.value)
      observer.unobserve(image)
    }
  }
}

const onLazy = () => {
  if (hasLazy.value && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(onEnterView)
    const el = imageRef.value
    if (el) imageObserver.observe(el)
  }
}

watch(path, (newValue) => {
  if (imageRef.value) imageRef.value.setAttribute('src', newValue || blankUrl)
})

const onError = () => {
  status.value = 404
}
onMounted(() => onLazy())
</script>

<template>
  <component :is="as" class="m-figure" :class="setClass.main" v-if="status === 200">
    <picture v-if="mobilePath && hasMobile">
      <source :srcset="mobilePath" media="(max-width: 428px)" />
      <img
        :src="blankUrl"
        :loading="hasLazy ? 'lazy' : null"
        ref="imageRef"
        :alt="alt"
        :class="setClass.img"
        @error="onError"
      />
    </picture>
    <img
      :src="blankUrl"
      :loading="hasLazy ? 'lazy' : null"
      ref="imageRef"
      :alt="alt"
      class="relative z-[1]"
      :class="setClass.img"
      @error="onError"
      v-else
    />
  </component>

  <div class="m-figure" :class="setClass.main" v-else>
    <div class="m-figure-error relative z-[1] flex items-center justify-center">
      <mIcon class="m:h-[36px] m:w-[36px] pt:h-[54px] pt:w-[54px]" icon="image_404" />
    </div>
  </div>
</template>

<style lang="postcss">
.m-figure {
  @apply relative;
}
</style>
