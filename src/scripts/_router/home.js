import { ENV } from '@js/_env.js'
import HomeIndex from '@views/Home/Index.vue'

const homeIndexPath = ENV.VITE_APP_ROUTEPATH

/**
 * @type {RouteRecordRaw[]}
 */
export default [
  {
    path: homeIndexPath,
    name: 'HomeIndex',
    component: HomeIndex,
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    redirect: homeIndexPath,
  },
]
