import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import { globalStore } from '../global'

describe('globalStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    sessionStorage.clear()
  })

  it('初始 theme 應為 f2e', () => {
    const store = globalStore()
    expect(store.theme).toBe('f2e')
  })

  it('changeTheme() 應更新 theme', () => {
    const store = globalStore()
    store.changeTheme('about')
    expect(store.theme).toBe('about')
  })

  it('changeTheme() 應將 theme 存入 sessionStorage', () => {
    const store = globalStore()
    store.changeTheme('skill')
    expect(sessionStorage.getItem('theme')).toBe('skill')
  })

  it('sessionStorage 有值時應以其作為初始 theme', () => {
    sessionStorage.setItem('theme', 'about')
    const store = globalStore()
    expect(store.theme).toBe('about')
  })
})
