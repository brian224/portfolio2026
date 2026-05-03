import { defineStore } from 'pinia'
import { ref } from 'vue'

export const globalStore = defineStore('global', () => {
  const theme = ref(sessionStorage.getItem('theme') || 'f2e') // 當前頁面

  // 切換分頁 作品 / 關於 / 專長 / 內頁
  const changeTheme = (newTheme) => {
    theme.value = newTheme
    sessionStorage.setItem('theme', newTheme)
  }

  return {
    theme,
    changeTheme,
  }
})
