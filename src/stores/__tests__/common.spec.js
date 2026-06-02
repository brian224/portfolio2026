import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import { commonStore } from '../common'

describe('commonStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('初始 isLoad 應為 true', () => {
    const store = commonStore()
    expect(store.isLoad).toBe(true)
  })

  it('onload(false) 應將 isLoad 設為 false', () => {
    const store = commonStore()
    store.onload(false)
    expect(store.isLoad).toBe(false)
  })

  it('reset() 應將 isLoad 還原為 true', () => {
    const store = commonStore()
    store.onload(false)
    store.reset()
    expect(store.isLoad).toBe(true)
  })
})
