<spec lang="md">
# AboutSection

02. About Me 關於我：個人照、基本資料、聯絡方式、社群連結、經歷與自傳。
純靜態內容，只依 `global.theme === 'about'` 顯示（v-show）。
</spec>

<script setup>
import mImg from '@components/modules/mImg.vue'

import { globalStore } from '@stores/global.js'

const global = globalStore()
</script>

<template>
  <Transition name="fade">
    <div
      class="inset-0 flex flex-col items-center m:py-[30px] t:pt-[50px] pt:absolute p:pt-[75px]"
      v-show="global.theme === 'about'"
    >
      <h2
        class="flex items-end justify-center border-b-[2px] border-solid border-[#acd1ee] text-center tracking-[2px] text-[#fff] m:w-[300px] t:w-[364px] tm:mb-[6px] tm:pb-[6px] tm:text-[12px] p:mb-[10px] p:w-[546px] p:pb-[9px] p:text-[18px]"
      >
        <span>02.</span>
        <em
          class="tracking-[-1px] m:mb-[-5px] t:mb-[-3px] tm:mx-[5px] tm:text-[24px] p:mx-[8px] p:mb-[-5px] p:text-[30px]"
          >About <span class="text-[#accaee]">Me</span></em
        >
        <span>關於我</span>
      </h2>
      <div
        class="flex items-center justify-center m:w-full m:flex-col m:px-[20px] t:mt-[32px] t:w-[810px] t:px-[30px] p:mt-[48px] p:w-[990px]"
      >
        <div class="whitespace-nowrap t:mr-[26px] p:mr-[39px]">
          <ul class="m:relative m:flex m:flex-col m:items-center m:pt-[32px] tm:mt-[5px]">
            <li class="flex m:justify-center pt:justify-end">
              <mImg
                src="home/AboutSection/photo.png"
                alt="Brian Lin`s photo"
                :setClass="{
                  main: 'tm:w-[133px] p:w-[200px] m:h-[133px] m:rounded-full overflow-hidden m:bg-[#fff]',
                }"
              />
            </li>
            <li
              class="border-b-[1px] border-dashed border-[#fff] leading-[1.5em] tracking-[1px] text-[#fff] m:w-full m:text-center m:text-[14px] t:text-[12px] tm:my-[6px] tm:pb-[6px] p:my-[9px] p:pb-[9px] p:text-[16px]"
            >
              Brian Lin (1984.02.24)
            </li>
            <li
              class="flex items-center leading-[1.5em] tracking-[1px] text-[#fff] m:w-full m:text-center m:text-[14px] t:text-[12px] p:text-[16px]"
            >
              <mIcon icon="ico-house" class="mr-[0.5em] h-[16px] w-[16px] text-[#fff]" />
              <span>方形糖 Sugarfun</span>
            </li>
            <li
              class="flex items-center leading-[1.5em] tracking-[1px] text-[#fff] m:w-full m:text-center m:text-[14px] t:text-[12px] p:text-[16px]"
            >
              <mIcon icon="ico-pin" class="mr-[0.5em] h-[16px] w-[16px] text-[#fff]" />
              <span>台灣 台北 / 新北</span>
            </li>
            <li
              class="flex items-center leading-[1.5em] tracking-[1px] text-[#fff] m:w-full m:text-center m:text-[14px] t:text-[12px] p:text-[16px]"
            >
              <mIcon icon="ico-mail" class="mr-[0.5em] h-[16px] w-[16px] text-[#fff]" />
              <a href="mailto:brianlin224@gmail.com">brianlin224@gmail.com</a>
            </li>
            <li
              class="flex items-center leading-[1.5em] tracking-[1px] text-[#fff] m:w-full m:text-center m:text-[14px] t:text-[12px] p:text-[16px]"
            >
              <mIcon icon="ico-phone" class="mr-[0.5em] h-[16px] w-[16px] text-[#fff]" />
              <a href="tel:+886956823720">0956-823-720</a>
            </li>
          </ul>
          <ul
            class="flex items-center m:justify-center tm:mt-[12px] p:mt-[20px] p:justify-between"
          >
            <li class="">
              <a
                class="text-[#333] p:hover:text-[#000]"
                href="https://github.com/brian224"
                target="_blank"
              >
                <mIcon
                  icon="ico-github"
                  class="transition-colors duration-300 ease-in-out tm:h-[32px] tm:w-[32px] p:h-[48px] p:w-[48px]"
                />
              </a>
            </li>
            <li class="tm:ml-[10px] p:ml-[15px]">
              <a
                class="text-[#00649d] p:hover:text-[#00456e]"
                href="http://tw.linkedin.com/in/brianlin224"
                target="_blank"
              >
                <mIcon
                  icon="ico-linkin"
                  class="transition-colors duration-300 ease-in-out tm:h-[32px] tm:w-[32px] p:h-[48px] p:w-[48px]"
                />
              </a>
            </li>
            <li class="tm:ml-[10px] p:ml-[15px]">
              <a
                class="text-[#ed4856] p:hover:text-[#a6333c]"
                href="https://instagram.com/brianlin224/"
                target="_blank"
              >
                <mIcon
                  icon="ico-ig"
                  class="transition-colors duration-300 ease-in-out tm:h-[32px] tm:w-[32px] p:h-[48px] p:w-[48px]"
                />
              </a>
            </li>
            <li class="tm:ml-[10px] p:ml-[15px]">
              <a
                class="text-[#375596] p:hover:text-[#273e70]"
                href="https://www.facebook.com/brian224"
                target="_blank"
              >
                <mIcon
                  icon="ico-fb"
                  class="transition-colors duration-300 ease-in-out tm:h-[32px] tm:w-[32px] p:h-[48px] p:w-[48px]"
                />
              </a>
            </li>
          </ul>
        </div>
        <ul class="">
          <li class="m:mt-[12px]">
            <h3 class="mb-[6px] text-[#accaee] m:text-[20px] t:text-[18px] p:text-[24px]">
              Experience
            </h3>
            <ul
              class="leading-[1.5em] tracking-[1px] text-[#fff] m:text-[14px] t:text-[12px] pt:columns-2 pt:gap-x-0 p:text-[16px]"
            >
              <li class="flex items-stretch break-inside-avoid">
                <span class="min-w-[10em]">2015.12~NOW</span><span>方形糖創意數位</span>
              </li>
              <li class="flex items-stretch break-inside-avoid">
                <span class="min-w-[10em]">2013.04~2015.11</span><span>永慶房產集團</span>
              </li>
              <li class="flex items-stretch break-inside-avoid">
                <span class="min-w-[10em]">2012.08~2013.03</span><span>安捷達顧問</span>
              </li>
              <li class="flex items-stretch break-inside-avoid">
                <span class="min-w-[10em]">2012.03~2012.07</span><span>學學文創志業</span>
              </li>
              <li class="flex items-stretch break-inside-avoid">
                <span class="min-w-[10em]">2009.12~2012.03</span><span>華藝數位</span>
              </li>
              <li class="flex items-stretch break-inside-avoid">
                <span class="min-w-[10em]">2009.03~2009.07</span><span>玉馬門創意設計</span>
              </li>
              <li class="flex items-stretch break-inside-avoid">
                <span class="min-w-[10em]">2008.05~2009.01</span><span>詩米亞媒體</span>
              </li>
            </ul>
          </li>
          <li class="tm:mt-[12px] p:mt-[20px]">
            <h3 class="mb-[6px] text-[#accaee] m:text-[20px] t:text-[18px] p:text-[24px]">
              Autobiography
            </h3>
            <article
              class="leading-[1.5em] tracking-[1px] text-[#fff] m:text-[14px] t:text-[12px] p:text-[16px]"
            >
              <p class="">
                我是具有十年以上經驗的前端工程師，目前專注於 Vue.js
                與互動型網站開發，擅長打造具吸引力的活動頁面與使用者互動體驗。實務上熟悉 Canvas
                操作、動畫效果實作與前端互動設計，能將創意轉化為流暢且具視覺張力的網頁呈現。
              </p>
              <p class="m:mt-[1.5em] p:mt-[1.5em]">
                過往專案多以短期活動網站為主，涵蓋遊戲互動、手勢操作與動畫效果等情境，能在有限時程內快速開發並完成高品質呈現，協助專案提升使用者參與度與互動體驗。同時也具備良好的程式結構設計能力，確保專案在高度客製化下仍維持可維護性。
              </p>
              <p class="m:mt-[1.5em] p:mt-[1.5em]">
                在團隊合作中，能與設計師、後端密切配合，將視覺設計與互動概念具體實現，並主動優化使用者體驗細節。持續關注前端技術與互動趨勢，期望在具創意與挑戰性的環境中，打造更具特色的數位體驗。
              </p>
            </article>
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>
