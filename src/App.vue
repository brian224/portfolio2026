<script setup>
import Footer from '@components/Layout/lFooter.vue'
import Header from '@components/Layout/lHeader.vue'
import Rotate from '@components/Layout/lRotate.vue'

import { onBeforeMount, onMounted, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

provide('route', route)
provide('router', router)

onBeforeMount(() => {})

onMounted(() => {})
</script>

<spec lang="md">
# App.vue

應用程式根元件，組裝版面骨架並向下注入路由。

## 版面結構

```
div.l-wrap
  └── main.l-body
        ├── Header       lHeader — 頁首導覽
        ├── router-view  各頁面內容
        └── Footer       lFooter — 頁尾版權
Rotate                   lRotate — 手機橫置遮罩（獨立於 l-wrap 之外）
```

`Rotate` 放在 `l-wrap` 外部，確保橫置時隱藏 `l-wrap` 後遮罩仍可顯示。

## Provide

| Key | 值 | 說明 |
|-----|----|------|
| `route` | `useRoute()` | 供子元件取得當前路由資訊 |
| `router` | `useRouter()` | 供子元件進行程式導航 |

## l-body 高度（各裝置）

| 裝置 | 高度 |
|------|------|
| 手機（`m:`） | `min-h-[100dvh]`，內容超出可捲動 |
| 平板（`t:`） | 固定 640px |
| 桌機（`p:`） | 固定 960px |
</spec>

<template>
  <div
    class="l-wrap flex w-full flex-col items-center overflow-hidden m:min-h-[100dvh] pt:h-[100dvh] p:min-h-[900px] p:justify-center"
    :class="route.name"
  >
    <main
      class="l-body relative flex w-full flex-col m:min-h-[100dvh] m:overflow-hidden t:h-[640px] p:h-[960px]"
    >
      <Header />
      <router-view />
      <Footer />
    </main>
  </div>
  <Rotate />
</template>

<style lang="postcss"></style>