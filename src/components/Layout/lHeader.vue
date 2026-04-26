<script setup>
import ImgSrc from '@components/ImgSrc.vue'
</script>

<template>
  <header class="l-header show mt-[9px] bg-repeat-x flex-col items-center justify-start w-full h-[189px] absolute bottom-[13dvh] z-[3]">
    <h1 class="logo">
      <em class="sr-only">Brian Lin 作品集</em>
      <ImgSrc
        src="common/logo.png"
        :setClass="{
          main: 'flex-shrink-0 w-[688px] h-[291px] mt-[-9px]',
        }"
      />
    </h1>
    <nav class="mb-[9px] w-full absolute bottom-full text-center">
      <ul class="menu flex justify-center items-center">
        <li class="px-[30px]"><button class="menu-link design cursor-pointer text-[#ff0] text-[18px]" data-theme="design">01. <span class="text-[#fff] tracking-[3px] transition-all duration-300 ease-in-out">[設計作品]</span></button></li>
        <li class="px-[30px]"><button class="menu-link about cursor-pointer text-[#ff0] text-[18px]" data-theme="about">02. <span class="text-[#fff] tracking-[3px] transition-all duration-300 ease-in-out">[關於我]</span></button></li>
        <li class="px-[30px]"><button class="menu-link skill cursor-pointer text-[#ff0] text-[18px]" data-theme="skill">03. <span class="text-[#fff] tracking-[3px] transition-all duration-300 ease-in-out">[專長技能]</span></button></li>
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

      span, &:hover span {
        @apply text-[#ff0];
      }
    }

    &:hover span {
      @apply text-[#accaee];
    }
  }
</style>
