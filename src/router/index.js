import { createRouter, createWebHistory } from 'vue-router'

import { ENV } from '@js/_env.js'
import pinia from '@stores'
import { commonStore } from '@stores/common.js'

const common = commonStore(pinia)

// 部署子目錄前綴（如 /portfolio，不含尾斜線），走環境變數，勿寫死。
// history 的 base 是 vite 的 base（'/'）；兩者只能設一個，理由見 vite.config.js 的 base
const homeIndexPath = ENV.VITE_APP_ROUTEPATH

const router = createRouter({
  history: createWebHistory(ENV.BASE_URL),
  routes: [
    {
      path: homeIndexPath,
      name: 'HomeIndex',
      component: () => import('@/views/Home/Index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: homeIndexPath,
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
