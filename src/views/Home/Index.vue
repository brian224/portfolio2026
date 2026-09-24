<spec lang="md">
# Home/Index.vue

作品集的唯一頁面。本身只做兩件事：組裝四個區塊，以及持有「作品列表」與「作品燈箱」共用的狀態。

## 區塊組成

各區塊依 `global.theme` 切換顯示，每個區塊自帶 fade 淡入淡出（`.fade-*` 樣式在本檔）：

| theme 值   | 元件                       | 內容                           |
| ---------- | -------------------------- | ------------------------------ |
| `'f2e'`    | `_components/WorksSection` | 01. Works & Design 過往作品    |
| `'about'`  | `_components/AboutSection` | 02. About Me 關於我            |
| `'skill'`  | `_components/SkillSection` | 03. Specialty & Skill 專長技能 |
| `'detail'` | `_components/WorkDetail`   | 作品燈箱                       |

⚠️ 四個區塊的 DOM 順序（作品 → 關於我 → 專長 → 燈箱）不要調動：平板 / 桌機四者都以 `absolute inset-0`
疊在同一格，手機則在文件流中上下排列，切換時淡入淡出的交疊次序都由 DOM 順序決定。

## 共用狀態（provide `'works'`）

燈箱在 DOM 上排在最後、與作品列表不是父子，所以狀態放在本頁，以 provide / inject 傳給兩者：

| key                  | 說明                                                   |
| -------------------- | ------------------------------------------------------ |
| `currentType`        | 目前分類 index（0/1/2）                                |
| `currentPage`        | 平板 / 桌機的分頁索引                                  |
| `currentIndex`       | 目前選取的作品 index                                   |
| `currentDetailIndex` | 燈箱內目前顯示的圖片編號（從 1 起算）                  |
| `caseGroups`         | 目前分類的作品依 `amount` 切頁，最後一頁以 `null` 補滿 |
| `amount`             | 一頁幾筆：手機 100（等於不分頁）、平板 / 桌機 14       |

作品資料本身在 `_data/works.js`。

## sessionStorage 持久化

| key     | 說明               |
| ------- | ------------------ |
| `type`  | 當前分類 index     |
| `page`  | 當前頁碼           |
| `index` | 當前選取作品 index |

三者都是上表狀態的初值來源。視窗寬度跨越 740px 時（手機 ↔ 非手機）自動 `clear()`，避免分頁狀態污染。
</spec>

<script setup>
import AboutSection from './_components/AboutSection.vue'
import SkillSection from './_components/SkillSection.vue'
import WorkDetail from './_components/WorkDetail.vue'
import WorksSection from './_components/WorksSection.vue'
import { datas } from './_data/works.js'

import { computed, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { MQ_MOBILE } from '@js/_breakpoints.js'
import { onDevice } from '@js/_prototype.js'

const currentType = ref(Number(sessionStorage.getItem('type')) || 0) // 目前在哪個分類 活動作品 / 專案作品 / 其他作品
const amount = onDevice() === 'm' ? 100 : 14 // 一頁幾筆作品
const currentPage = ref(Number(sessionStorage.getItem('page')) || 0) // 作品有多頁時 目前是哪一頁
const currentIndex = ref(Number(sessionStorage.getItem('index')) || 0) // 當前選取作品 index
const currentDetailIndex = ref(1) // 當前選取作品圖片 index
let mediaQuery

const chunkArrayWithFill = (array, size) => {
  const groups = Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  )

  // 補滿每一組
  return groups.map((group) => {
    if (group.length < size) {
      return [...group, ...Array(size - group.length).fill(null)]
    }
    return group
  })
}

const caseGroups = computed(() => chunkArrayWithFill(datas[currentType.value].case, amount))

watch(currentPage, (val) => {
  sessionStorage.setItem('page', val)
})

// 作品列表（WorksSection）與作品燈箱（WorkDetail）共用這組狀態。放在頁面層而不是其中一個子元件：
// 燈箱在 DOM 上排在「關於我」「專長技能」之後，兩者不是父子，列表無法直接把狀態傳給燈箱
provide('works', {
  currentType,
  currentPage,
  currentIndex,
  currentDetailIndex,
  caseGroups,
  amount,
})

const clearStorage = () => {
  sessionStorage.clear()
}

onMounted(() => {
  // 與 onDevice() 的「是不是手機」同一條件：跨過去時 amount（每頁筆數）會變，分頁狀態要清掉
  mediaQuery = window.matchMedia(MQ_MOBILE)
  mediaQuery.addEventListener('change', clearStorage)
})

onBeforeUnmount(() => {
  mediaQuery.removeEventListener('change', clearStorage)
})
</script>

<template>
  <div class="l-cnt relative h-full w-full m:min-h-[100dvh] m:pb-[164px]">
    <WorksSection />
    <AboutSection />
    <SkillSection />
    <WorkDetail />
  </div>
</template>

<style lang="postcss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
