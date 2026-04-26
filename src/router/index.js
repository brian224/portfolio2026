import { createRouter, createWebHistory } from 'vue-router'

import { ENV } from '@js/_env.js'
import pinia from '@stores'
import { commonStore } from '@stores/common.js'

import routerHome from '@js/_router/home.js'

const common = commonStore(pinia)

const routes = [...routerHome]
const router = createRouter({
  history: createWebHistory(ENV.BASE_URL),
  routes,
  linkActiveClass: 'router-active',
  linkExactActiveClass: 'router-exact-active',
})

router.beforeEach(async () => {
  // 清空加載狀態
  common.reset()
  // 隱藏所有跳窗
})

// 路由跳轉後在背景判斷是否跳轉到其他頁面
router.afterEach(async () => {})

export default router
