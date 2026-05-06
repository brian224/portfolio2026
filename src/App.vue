<script setup>
import Footer from '@components/Layout/lFooter.vue'
import Header from '@components/Layout/lHeader.vue'
import Rotate from '@components/Layout/lRotate.vue'

import { onBeforeMount, onMounted, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

provide('route', route)
provide('router', router)

onBeforeMount(() => {})

onMounted(() => {})
</script>

<template>
  <div
    class="l-wrap flex w-full flex-col items-center overflow-hidden m:min-h-[100dvh] pt:h-[100dvh] p:min-h-[900px] p:justify-center"
    :class="route.name"
  >
    <main
      class="l-body relative flex w-full flex-col m:min-h-[100dvh] m:overflow-hidden t:h-[640px] p:h-[960px]"
    >
      <Header />
      <router-view />
      <Footer />
    </main>
  </div>
  <Rotate />
</template>

<style src="@css/_modules/nSup.css"></style>
<style lang="postcss"></style>
