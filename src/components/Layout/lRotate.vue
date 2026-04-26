<script setup></script>

<template>
  <div class="l-lock bg-dot-gr">
    <div class="l-lock-bd flex h-full w-full flex-col items-center justify-center">
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
