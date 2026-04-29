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
    class="l-wrap flex h-[100dvh] min-h-[900px] w-full flex-col items-center justify-center overflow-hidden"
    :class="route.name"
  >
    <main class="l-body relative flex w-full flex-col t:h-full p:h-[960px]">
      <Header />
      <router-view />
      <Footer />
    </main>
  </div>
  <Rotate />
</template>

<style src="@css/_modules/nSup.css"></style>
<style lang="postcss"></style>
