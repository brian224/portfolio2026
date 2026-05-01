<script setup>
import ImgSrc from '@components/ImgSrc.vue'

import { globalStore } from '@stores/global.js'

const global = globalStore()
</script>

<template>
  <header
    class="l-header show z-[3] w-full flex-col items-center justify-start bg-repeat-x m:fixed m:bottom-[44px] m:h-[63px] m:bg-[#5894DD] t:bottom-[24px] t:mt-[6px] t:h-[126px] pt:absolute p:bottom-[20px] p:mt-[9px] p:h-[189px]"
  >
    <h1 class="logo pointer-events-none z-[1] m:relative">
      <em class="sr-only">Brian Lin 作品集</em>
      <ImgSrc
        src="common/logo.png"
        :setClass="{
          main: 'flex-shrink-0 p:w-[688px] t:w-[458px] m:w-[229px] p:h-[291px] t:h-[194px] m:h-[97px] p:mt-[-9px] t:mt-[-6px] m:mt-[-3px]',
        }"
      />
    </h1>
    <nav class="absolute bottom-full w-full text-center m:bg-[#5894DD] t:mb-[6px] p:mb-[9px]">
      <ul class="menu flex items-center justify-center">
        <li class="m:px-[10px] t:px-[20px] p:px-[30px]">
          <button
            class="menu-link design cursor-pointer text-[#ff0] tm:text-[12px] p:text-[18px]"
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
            class="menu-link about cursor-pointer text-[#ff0] tm:text-[12px] p:text-[18px]"
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
            class="menu-link skill cursor-pointer text-[#ff0] tm:text-[12px] p:text-[18px]"
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
