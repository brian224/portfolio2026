<spec lang="md">
# WorksSection

01. Works & Design 過往作品：分類切換、作品縮圖列表、平板 / 桌機的分頁滑軌。
狀態（目前分類、頁碼、選取的作品）由頁面 `Home/Index.vue` 以 provide `'works'` 傳入，本元件不自己持有。

## 分頁邏輯

- 平板 / 桌機（`pt:`）：每頁 14 筆，最後一頁不足時補 `null`，補出來的格子顯示為帶 × 樣式的佔位卡（`.cross`）
- 手機（`m:`）：隱藏滑軌，改顯示下方不分頁的完整列表（`amount` 為 100，燈箱換算頁碼時等同不分頁）
- 翻頁以滑軌的 `scrollLeft` 水平捲動，搭配 `scroll-smooth`
- 切回本區塊（theme 變回 `'f2e'`）或分類內容改變時，捲回 `currentPage` 那一頁

## 作品燈箱進入

點擊作品縮圖呼叫 `toDetail(idx)`：

1. 呼叫 `global.changeTheme('detail')` 切換至燈箱
2. `currentDetailIndex` 重設為 1
3. 計算 `currentPage` 與 `currentIndex` 並寫入 sessionStorage
</spec>

<script setup>
import mImg from '@components/modules/mImg.vue'
import { datas } from '../_data/works.js'

import { computed, inject, nextTick, onMounted, ref, watch } from 'vue'
import { globalStore } from '@stores/global.js'

const global = globalStore()
const { currentType, currentPage, currentIndex, currentDetailIndex, caseGroups, amount } =
  inject('works')
const sliderRef = ref(null)

watch(
  () => global.theme,
  async (theme) => {
    if (theme !== 'f2e') return

    const savedPage = Number(sessionStorage.getItem('page')) || 0
    const maxPage = totalPages.value - 1

    currentPage.value = Math.max(0, Math.min(savedPage, maxPage))

    await scrollToCurrentPage()
  },
  { flush: 'post' }
)

watch(
  caseGroups,
  async () => {
    const maxPage = caseGroups.value.length - 1

    if (currentPage.value > maxPage) {
      currentPage.value = 0
    }

    if (global.theme === 'f2e') {
      await scrollToCurrentPage()
    }
  },
  { flush: 'post' }
)

// 切換分類 活動作品 / 專案作品 / 其他作品
const switchType = async (i) => {
  currentType.value = i
  currentPage.value = 0

  sessionStorage.setItem('type', i)
  sessionStorage.setItem('page', 0)

  await nextTick()
  sliderRef.value && (sliderRef.value.scrollLeft = 0)
}

const scrollToCurrentPage = async () => {
  await nextTick()

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const el = sliderRef.value
      if (!el) return
      if (!el.clientWidth) return

      el.scrollLeft = el.clientWidth * currentPage.value
    })
  })
}

// 左右鍵切換作品
const goPage = (page) => {
  const maxPage = totalPages.value - 1

  currentPage.value = Math.max(0, Math.min(page, maxPage))

  nextTick(() => {
    const el = sliderRef.value
    if (!el) return

    el.scrollTo({
      left: el.clientWidth * currentPage.value,
      behavior: 'smooth',
    })
  })
}

const prevPage = () => {
  goPage(currentPage.value - 1)
}

const nextPage = () => {
  goPage(currentPage.value + 1)
}

const totalPages = computed(() => caseGroups.value.length)

const hasPrev = computed(() => currentPage.value > 0)

const hasNext = computed(() => currentPage.value < totalPages.value - 1)

const toDetail = (idx) => {
  global.changeTheme('detail')
  currentDetailIndex.value = 1

  if (idx >= amount) {
    currentIndex.value = Math.floor(idx % amount)
    currentPage.value = Math.floor(idx / amount)
    sessionStorage.setItem('index', currentIndex.value)
    sessionStorage.setItem('page', currentPage.value)
  } else {
    currentIndex.value = idx
    sessionStorage.setItem('index', currentIndex.value)
  }
}

onMounted(async () => {
  if (global.theme === 'f2e') {
    await scrollToCurrentPage()
  }
})
</script>

<template>
  <Transition name="fade">
    <div
      class="inset-0 flex flex-col items-center m:py-[30px] t:pt-[50px] pt:absolute p:pt-[75px]"
      v-show="global.theme === 'f2e'"
    >
      <h2
        class="flex items-end justify-center border-b-[2px] border-solid border-[#acd1ee] text-center tracking-[2px] text-[#fff] m:w-[300px] t:w-[364px] tm:mb-[6px] tm:pb-[6px] tm:text-[12px] p:mb-[10px] p:w-[546px] p:pb-[9px] p:text-[18px]"
      >
        <span>01.</span>
        <em
          class="tracking-[-1px] m:mb-[-5px] t:mb-[-3px] tm:mx-[5px] tm:text-[24px] p:mx-[8px] p:mb-[-5px] p:text-[30px]"
          >Works & <span class="text-[#accaee]">Design</span></em
        >
        <span>過往作品</span>
      </h2>
      <ul class="flex items-center justify-center text-center m:mt-[5px]">
        <li
          v-for="(item, index) in datas"
          :key="item.type"
          class="leading-[1em] tm:px-[12px] tm:text-[12px] p:px-[14px] p:text-[16px]"
          :class="index === 0 ? '' : 'border-l-[1px] border-solid border-[#fff]'"
        >
          <button
            class="leading-[1em] transition-colors duration-300 ease-in-out p:hover:text-[#accaee] t:text-[12px] p:text-[16px]"
            :class="currentType === index ? 'pointer-events-none text-[#ff0]' : 'text-[#fff]'"
            @click="switchType(index)"
          >
            {{ item.type }}
          </button>
        </li>
      </ul>
      <div class="tm:mt-[32px] p:mt-[48px]">
        <div class="relative m:w-[306px] t:w-[780px] t:px-[26px] p:w-[1162px] p:px-[45px]">
          <div
            ref="sliderRef"
            class="no-scrollbar snap-x snap-mandatory overflow-x-auto scroll-smooth m:hidden"
          >
            <div class="flex">
              <ul
                v-for="(caseGroup, groupIndex) in caseGroups"
                :key="groupIndex"
                class="flex w-full shrink-0 snap-start flex-wrap items-start justify-center"
              >
                <li
                  v-for="(item, index) in caseGroup"
                  :key="`${groupIndex}-${index}`"
                  class="flex flex-col items-center justify-center tm:w-[102px] tm:px-[5px] p:w-[152px] p:px-[8px]"
                >
                  <button
                    class="flex flex-col items-center justify-center text-[#fff] transition-colors duration-300 ease-in-out p:hover:text-[#accaee]"
                    aria-label="了解更多此作品"
                    @click="toDetail(index)"
                    :class="item ? '' : 'pointer-events-none'"
                  >
                    <mImg
                      :src="`home/${item.CaseType}/${item.CoverImg}`"
                      :alt="`${item.CaseName}`"
                      :setClass="{
                        main: 'shadow-md flex-shrink-0 flex items-center justify-center p:w-[126px] tm:w-[84px] p:h-[126px] tm:h-[84px] p:border-[4px] tm:border-[3px] border-[#98cbe1] border-solid p:m-[5px] tm:m-[3px] px-[1px] bg-[#4e5ca5]',
                        img: 'w-full',
                      }"
                      v-if="item"
                    />
                    <div
                      class="flex flex-shrink-0 items-center justify-center border-solid border-[#98cbe1] bg-[#addee3] px-[1px] shadow-md tm:m-[3px] tm:h-[84px] tm:w-[84px] tm:border-[3px] p:m-[5px] p:h-[126px] p:w-[126px] p:border-[4px]"
                      v-else
                    >
                      <i
                        class="cross relative overflow-hidden border-[1px] border-solid border-[#6ba6e0] tm:h-[77px] tm:w-[77px] p:h-[116px] p:w-[116px]"
                      ></i>
                    </div>
                    <em
                      class="min-h-[3em] whitespace-nowrap text-center leading-[1.5em] tracking-[2px] tm:mb-[5px] tm:text-[12px] p:mb-[8px] p:text-[16px]"
                      v-html="item?.CaseName || ''"
                    ></em>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <button
            class="ico-arrow left absolute top-1/2 -translate-y-1/2 m:hidden t:left-[8px] p:left-0"
            @click="prevPage"
            v-if="hasPrev"
          >
            <span class="sr-only">上一頁</span>
          </button>
          <button
            class="ico-arrow right absolute top-1/2 -translate-y-1/2 m:hidden t:right-[8px] p:right-0"
            @click="nextPage"
            v-if="hasNext"
          >
            <span class="sr-only">下一頁</span>
          </button>
          <ul class="flex w-full shrink-0 flex-wrap items-start pt:hidden pt:justify-center">
            <li
              v-for="(item, index) in datas[currentType].case"
              :key="index"
              class="flex flex-col items-center justify-center tm:w-[102px] tm:px-[5px] p:w-[152px] p:px-[8px]"
            >
              <button
                class="flex flex-col items-center justify-center text-[#fff] transition-colors duration-300 ease-in-out p:hover:text-[#accaee]"
                @click="toDetail(index)"
                :class="item ? '' : 'pointer-events-none'"
              >
                <mImg
                  :src="`home/${item.CaseType}/${item.CoverImg}`"
                  :alt="`${item.CaseType}/${item.CaseName}`"
                  :setClass="{
                    main: 'shadow-md flex-shrink-0 flex items-center justify-center p:w-[126px] tm:w-[84px] p:h-[126px] tm:h-[84px] p:border-[4px] tm:border-[3px] border-[#98cbe1] border-solid p:m-[5px] tm:m-[3px] px-[1px] bg-[#4e5ca5]',
                    img: 'w-full',
                  }"
                  v-if="item"
                />
                <div
                  class="flex flex-shrink-0 items-center justify-center border-solid border-[#98cbe1] bg-[#addee3] px-[1px] shadow-md tm:m-[3px] tm:h-[84px] tm:w-[84px] tm:border-[3px] p:m-[5px] p:h-[126px] p:w-[126px] p:border-[4px]"
                  v-else
                >
                  <i
                    class="cross relative overflow-hidden border-[1px] border-solid border-[#6ba6e0] tm:h-[77px] tm:w-[77px] p:h-[116px] p:w-[116px]"
                  ></i>
                </div>
                <em
                  class="min-h-[3em] whitespace-nowrap text-center leading-[1.5em] tracking-[2px] tm:mb-[5px] tm:text-[12px] p:mb-[8px] p:text-[18px]"
                  v-html="item?.CaseName || ''"
                ></em>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="postcss">
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.ico-arrow {
  @apply t:h-[12px] t:w-[7px] t:px-[10px] t:py-[20px] p:h-[20px] p:w-[11px] p:px-[15px] p:py-[30px];

  &::before,
  &::after {
    @apply absolute left-1/2 bg-[#fff] content-default t:h-[8px] t:w-[2px] p:h-[12px] p:w-[3px];
  }

  &::before {
    @apply bottom-1/2 mb-[-1px];
  }

  &::after {
    @apply top-1/2 mt-[-1px];
  }

  &.left {
    &::before {
      @apply rotate-[30deg];
    }

    &::after {
      @apply rotate-[-30deg];
    }
  }

  &.right {
    &::before {
      @apply rotate-[-30deg];
    }

    &::after {
      @apply rotate-[30deg];
    }
  }
}

.cross {
  &::before,
  &::after {
    @apply absolute h-[1px] bg-[#fff] content-default tm:w-[110px] p:w-[164px];
  }

  &::before {
    @apply left-0 top-0 origin-top-left rotate-[45deg];
  }

  &::after {
    @apply right-0 top-0 origin-top-right rotate-[-45deg];
  }
}
</style>
