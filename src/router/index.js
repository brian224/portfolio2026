import { createRouter, createWebHistory } from 'vue-router'

import pinia from '@stores'
import { commonStore } from '@stores/common.js'

const common = commonStore(pinia)

const router = createRouter({
  history: createWebHistory('/portfolio/'),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home/Index.vue'),
    },
  ],
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
