import { defineStore } from 'pinia'

import { ENV } from '@js/_env.js'
import { getOS } from '@js/_prototype.js'

export const globalStore = defineStore('global', () => {
  const browersShare = () => {
    if (getOS() === 'Android') {
      navigator.clipboard.writeText(ENV.VITE_APP_URL)
    } else {
      navigator
        .share({
          title: document.title,
          text: '',
          url: ENV.VITE_APP_URL,
        })
        .catch((err) => console.log('分享取消或失敗', err))
    }
  }

  return {
    browersShare,
  }
})
