<script setup>
import { computed, onMounted, ref, watch } from 'vue'

import blankUrl from '@imgs/common/blank.svg'

import { hashHex } from '@js/_crypto.js'
import { ENV } from '@js/_env.js'
import CONFIG from '/config.js'

// ✅ 用字面字串，固定抓 assets/img
const MAP = import.meta.glob('/src/assets/img/**/*', { eager: true, import: 'default' })

// 將相對檔名（相對於 CONFIG.imgs = 'assets/img'）轉成 glob key
const toKey = (p) => `/src/${CONFIG.imgs}/${p}`

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

  console.warn('[ImgSrc] not found:', toKey(raw))
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
  <component :is="as" class="m-figure" :class="setClass.main, status === 200 ? '' : 'is-loading'" v-if="status === 200">
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
      <SvgIcon class="m:h-[36px] m:w-[36px] pt:h-[54px] pt:w-[54px]" icon="image_404" />
    </div>
  </div>
</template>

<style lang="postcss">
.m-figure {
  @apply relative;

  &.is-loading::before {
    animation: loading 0.75s 0s linear infinite;
    @apply absolute left-1/2 top-1/2 z-[0] ml-[-12px] mt-[-12px] h-[24px] w-[24px] rounded-full border-[2px] border-solid border-[#fff] border-b-transparent bg-transparent content-default;
  }
}

@keyframes loading {
  0% {
    transform: rotate(0deg) scale(1);
  }

  50% {
    transform: rotate(180deg) scale(0.6);
  }

  100% {
    transform: rotate(360deg) scale(1);
  }
}
</style>
