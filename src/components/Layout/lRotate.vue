<script setup></script>

<template>
  <div class="l-lock">
    <div class="l-lock-bd flex h-full w-full flex-col items-center justify-center">
      <span class="text-[#fff]">請將手機轉為直式，以確保最佳體驗</span>
    </div>
  </div>
</template>

<style lang="postcss">
.l-lock {
  @apply hidden;
}

@screen mLandscape {
  html,
  body {
    @apply text-vmmls leading-[1.6em];
  }

  .l-wrap {
    @apply hidden;
  }

  .l-lock {
    @apply fixed inset-0 flex;
  }
}
</style>
