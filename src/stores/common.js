import { defineStore } from 'pinia'
import { ref } from 'vue'

export const commonStore = defineStore('common', () => {
  /** 是否在讀取中 */
  const isLoad = ref(true)

  /**
   * 變更加載狀態
   * @param {boolean} boolean 是否加載完畢
   */
  const onload = (boolean) => {
    isLoad.value = boolean
  }

  /**
   * 重置網站狀態
   */
  const reset = () => {
    onload(true)
  }

  return {
    isLoad,
    onload,
    reset,
  }
})
