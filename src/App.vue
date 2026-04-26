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
    class="l-wrap flex min-h-[100dvh] w-full flex-col items-center justify-center"
    :class="route.name"
  >
    <main class="l-body relative flex h-[1050px] w-full flex-col">
      <Header />
      <router-view />
      <Footer />
    </main>
  </div>
  <Rotate />
</template>

<style src="@css/_modules/nSup.css"></style>
<style lang="postcss"></style>
