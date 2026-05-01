<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: '',
    require: true,
  },
})

const href = computed(() => `/portfolio${__SPRITEMAP_URL__}#${props.icon}`)
</script>

<template>
  <svg class="fill-current">
    <use :href="href" />
  </svg>
</template>
