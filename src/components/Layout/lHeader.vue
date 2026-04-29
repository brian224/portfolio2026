<script setup>
import ImgSrc from '@components/ImgSrc.vue'

import { globalStore } from '@stores/global.js'

const global = globalStore()
</script>

<template>
  <header
    class="l-header show absolute z-[3] mt-[9px] h-[189px] w-full flex-col items-center justify-start bg-repeat-x t:bottom-[36px] p:bottom-[20px]"
  >
    <h1 class="logo">
      <em class="sr-only">Brian Lin 作品集</em>
      <ImgSrc
        src="common/logo.png"
        :setClass="{
          main: 'flex-shrink-0 w-[688px] h-[291px] mt-[-9px]',
        }"
      />
    </h1>
    <nav class="absolute bottom-full mb-[9px] w-full text-center">
      <ul class="menu flex items-center justify-center">
        <li class="px-[30px]">
          <button class="menu-link design cursor-pointer text-[18px] text-[#ff0]">
            01.
            <span
              class="tracking-[3px] text-[#fff] transition-all duration-300 ease-in-out"
              @click="global.changeTheme('f2e')"
              >[設計作品]</span
            >
          </button>
        </li>
        <li class="px-[30px]">
          <button class="menu-link about cursor-pointer text-[18px] text-[#ff0]">
            02.
            <span
              class="tracking-[3px] text-[#fff] transition-all duration-300 ease-in-out"
              @click="global.changeTheme('about')"
              >[關於我]</span
            >
          </button>
        </li>
        <li class="px-[30px]">
          <button class="menu-link skill cursor-pointer text-[18px] text-[#ff0]">
            03.
            <span
              class="tracking-[3px] text-[#fff] transition-all duration-300 ease-in-out"
              @click="global.changeTheme('skill')"
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
    @apply cursor-default;

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
