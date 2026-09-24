<spec lang="md">
# WorkDetail

作品燈箱：顯示選取的那件作品（`caseGroups[currentPage][currentIndex]`）的截圖與連結。
只在 `global.theme === 'detail'` 時渲染（v-if）。狀態由頁面 `Home/Index.vue` 以 provide `'works'` 傳入。

## 顯示

- 平板 / 桌機：顯示第 `currentDetailIndex` 張；右側書籤列切換圖片編號，BACK 回作品列表
- 手機：所有截圖依序直向排開，書籤列不顯示
- 截圖路徑：`home/WorkDetail/{CaseType}/{CaseType}{CaseID}_0{n}.png`（`n` 從 1 到 `PhotoCount`，檔案數要與 `PhotoCount` 一致）

## 連結

`webLink` / `webDesc` 以 `,` 分隔多筆時，依目前圖片編號取第 n 筆；`webLink` 為空字串表示沒有連結。
</spec>

<script setup>
import mImg from '@components/modules/mImg.vue'

import { inject } from 'vue'
import { globalStore } from '@stores/global.js'

const global = globalStore()
const { currentPage, currentIndex, currentDetailIndex, caseGroups } = inject('works')
</script>

<template>
  <Transition name="fade">
    <div
      class="inset-0 flex flex-col items-center m:py-[30px] t:pt-[50px] pt:absolute p:pt-[75px]"
      v-if="global.theme === 'detail'"
    >
      <div
        class="relative m:w-[335px] t:mt-[16px] t:h-[340px] t:w-[562px] p:mt-[24px] p:h-[552px] p:w-[843px]"
      >
        <div
          class="wrap-shadow relative z-[1] h-full overflow-hidden t:border-[3px] pt:border-solid pt:border-[#98cbe1] pt:bg-[#4e5ca5] p:border-[4px]"
        >
          <ul class="">
            <li
              v-for="index in parseInt(caseGroups[currentPage][currentIndex].PhotoCount, 10)"
              :key="`${index}`"
              class="relative flex h-full w-full flex-col justify-center m:mb-[10px] pt:items-center"
            >
              <mImg
                :src="`home/WorkDetail/${caseGroups[currentPage][currentIndex].CaseType}/${caseGroups[currentPage][currentIndex].CaseType}${caseGroups[currentPage][currentIndex].CaseID}_0${currentDetailIndex}.png`"
                :alt="`${caseGroups[currentPage][currentIndex].webDesc}`"
                :setClass="{
                  main: 'flex-shrink-0 flex items-center justify-center p:h-[544px] p:w-[835px] t:h-[334px] t:w-[556px] m:hidden',
                  img: 'max-w-full max-h-full object-contain',
                }"
                v-if="caseGroups[currentPage][currentIndex]"
              />
              <mImg
                :src="`home/WorkDetail/${caseGroups[currentPage][currentIndex].CaseType}/${caseGroups[currentPage][currentIndex].CaseType}${caseGroups[currentPage][currentIndex].CaseID}_0${index}.png`"
                :alt="`${caseGroups[currentPage][currentIndex].webDesc}`"
                :setClass="{
                  main: 'm:wrap-shadow m:mb-[3px] flex-shrink-0 flex items-center justify-center m:w-full pt:hidden border-solid border-[#98cbe1] bg-[#4e5ca5] m:border-[3px]',
                  img: 'max-w-full max-h-full object-contain',
                }"
                v-if="caseGroups[currentPage][currentIndex]"
              />
              <a
                :href="caseGroups[currentPage][currentIndex].webLink"
                target="_blank"
                class="web-url left-0 z-[1] flex items-center !bg-opacity-70 py-[4px] text-[#fff] underline transition-colors duration-300 ease-in-out p:hover:text-[#addee3] m:relative tm:text-[12px] pt:absolute pt:bottom-0 pt:justify-center pt:bg-[#4e5ca5] p:text-[16px]"
                v-if="
                  caseGroups[currentPage][currentIndex].webLink &&
                  caseGroups[currentPage][currentIndex].webLink.split(',').length === 1
                "
              >
                <i class="ico-d-arrow"></i>
                <span>{{ caseGroups[currentPage][currentIndex].webDesc }}</span>
              </a>
              <a
                :href="
                  caseGroups[currentPage][currentIndex].webLink.split(',')[currentDetailIndex - 1]
                "
                target="_blank"
                class="web-url left-0 z-[1] flex items-center !bg-opacity-70 py-[4px] text-[#fff] underline transition-colors duration-300 ease-in-out p:hover:text-[#addee3] m:relative tm:text-[12px] pt:absolute pt:bottom-0 pt:justify-center pt:bg-[#4e5ca5] p:text-[16px]"
                v-else-if="
                  caseGroups[currentPage][currentIndex].webLink &&
                  caseGroups[currentPage][currentIndex].webLink.split(',').length !== 1 &&
                  caseGroups[currentPage][currentIndex].webDesc.split(',')[
                    currentDetailIndex - 1
                  ] !== ''
                "
              >
                <i class="ico-d-arrow"></i>
                <span>{{
                  caseGroups[currentPage][currentIndex].webDesc.split(',')[currentDetailIndex - 1]
                }}</span>
              </a>
            </li>
          </ul>
        </div>
        <ul
          class="ani-bookmark absolute z-[0] flex m:left-[4px] m:top-full m:mt-[-1px] m:hidden t:top-[4px] t:w-[50px] pt:left-full pt:flex-col p:top-[6px] p:w-[75px]"
        >
          <li
            class="border-[1px] border-solid border-[#4c82d5] bg-[#fff] transition-[margin] duration-300 ease-in-out m:mt-[-16px] m:flex m:h-[50px] m:w-[40px] m:items-end t:ml-[-12px] t:w-[50px] p:ml-[-23px] p:w-[75px] p:hover:ml-[-1px]"
          >
            <button
              class="flex h-full w-full text-[#00adee] m:items-end m:justify-center m:pb-[4px] m:text-center t:h-[22px] t:pr-[6px] t:text-[10px] pt:items-center pt:justify-end pt:text-right p:h-[33px] p:pr-[9px] p:text-[13px]"
              @click="global.changeTheme('f2e')"
            >
              <span class="m:hidden">BACK</span>
              <span class="relative rotate-180 pt:hidden">➜</span>
            </button>
          </li>
          <li
            v-for="index in parseInt(caseGroups[currentPage][currentIndex].PhotoCount, 10)"
            :key="`${index}`"
            class="ani-bookmark-2 -translate-x-full border-[1px] border-solid border-[#4c82d5] transition-[background-color,margin] duration-300 ease-in-out m:ml-[5px] m:flex m:h-[50px] m:w-[40px] m:items-end t:mt-[5px] t:h-[22px] t:w-[50px] p:mt-[8px] p:h-[33px] p:w-[75px] p:hover:ml-[-23px]"
            :class="
              currentDetailIndex === index
                ? 'pointer-events-none bg-[#d5de21] m:mt-[-1px] pt:ml-[-1px]'
                : 'bg-[#fff] m:mt-[-16px] t:ml-[-28px] p:ml-[-42px]'
            "
          >
            <button
              class="flex h-full w-full text-right text-[#00adee] m:items-end m:justify-center m:pb-[4px] t:h-[22px] t:pr-[6px] t:text-[10px] pt:items-center pt:justify-end p:h-[33px] p:pr-[9px] p:text-[13px]"
              @click="currentDetailIndex = index"
            >
              {{ index }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<style lang="postcss">
.web-url {
  @apply pt:pr-[10px];

  &::after {
    background-image: linear-gradient(to right, #4e5ca5b3 0%, #4e5ca500 100%);
    @apply absolute bottom-0 left-full top-0 w-[50px] content-default;
  }
}

.ico-d-arrow {
  @apply relative mx-[7px] h-[8px] w-[8px];

  &::before,
  &::after {
    @apply absolute top-1/2 -translate-y-1/2 border-[4px] border-solid border-transparent border-l-[#fff] content-default;
  }

  &::before {
    @apply left-[3px];
  }

  &::after {
    @apply left-0;
  }
}

.ani-bookmark {
  animation: showBookmark 0.3s 0s forwards ease-in-out;
}

.ani-bookmark-2 {
  animation: showBookmark-2 0.2s 0.2s forwards ease-in-out;
}

@screen pt {
  .wrap-shadow {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  @keyframes showBookmark {
    0% {
      transform: translateY(480px);
    }

    100% {
      transform: translateY(0);
    }
  }

  @keyframes showBookmark-2 {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(0);
    }
  }
}

@screen m {
  .m\:wrap-shadow {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  .ani-bookmark {
    transform: translateX(100dvw);
  }

  @keyframes showBookmark {
    0% {
      transform: translateX(100dvw);
    }

    100% {
      transform: translateY(0);
    }
  }

  @keyframes showBookmark-2 {
    0% {
      transform: translateY(-100%);
    }

    100% {
      transform: translateX(0);
    }
  }
}
</style>
