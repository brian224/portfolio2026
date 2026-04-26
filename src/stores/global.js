import { defineStore } from 'pinia'
import { ref } from 'vue'

// import { ENV } from '@js/_env.js'
// import { getOS } from '@js/_prototype.js'

export const globalStore = defineStore('global', () => {
  const theme = ref(localStorage.getItem('theme') || 'f2e') // 當前頁面
  const worksType = ref('f2e') // 作品類型
  const changeTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }

  return {
    theme,
    worksType,
    changeTheme,
  }
})
