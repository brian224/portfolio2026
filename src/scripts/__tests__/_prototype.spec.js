import { afterEach, describe, expect, it, vi } from 'vitest'

import { onDevice } from '../_prototype'

// 模擬 window：innerWidth 與互動媒體特性（pointer / 矮橫向手機）
function mockWindow({ innerWidth = 1280, isTouch = false, isPhoneLandscape = false } = {}) {
  vi.stubGlobal('innerWidth', innerWidth)
  vi.stubGlobal('matchMedia', (query) => ({
    matches: query.includes('pointer: coarse')
      ? isTouch
      : query.includes('orientation: landscape')
        ? isPhoneLandscape
        : false,
  }))
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('onDevice — 桌機 p（夠寬且為滑鼠/觸控板）', () => {
  it('寬度 1280 + 精準指標 應回傳 p', () => {
    mockWindow({ innerWidth: 1280, isTouch: false })
    expect(onDevice()).toBe('p')
  })

  it('寬度 1025 + 精準指標 應回傳 p', () => {
    mockWindow({ innerWidth: 1025, isTouch: false })
    expect(onDevice()).toBe('p')
  })
})

describe('onDevice — 手機 m（窄寬度或矮橫向）', () => {
  it('寬度 739 應回傳 m', () => {
    mockWindow({ innerWidth: 739 })
    expect(onDevice()).toBe('m')
  })

  it('窄寬度觸控（手機）應回傳 m', () => {
    mockWindow({ innerWidth: 390, isTouch: true })
    expect(onDevice()).toBe('m')
  })

  it('矮的橫向手機 應回傳 m', () => {
    mockWindow({ innerWidth: 844, isTouch: true, isPhoneLandscape: true })
    expect(onDevice()).toBe('m')
  })
})

describe('onDevice — 平板 t（中段寬度或寬螢幕觸控）', () => {
  it('中段寬度 1024（觸控）應回傳 t', () => {
    mockWindow({ innerWidth: 1024, isTouch: true })
    expect(onDevice()).toBe('t')
  })

  it('桌機 resize 至平板尺寸（900，精準指標）應回傳 t', () => {
    mockWindow({ innerWidth: 900, isTouch: false })
    expect(onDevice()).toBe('t')
  })

  it('iPad Pro 橫向（1366px 且為觸控）應回傳 t，不再誤判為桌機', () => {
    mockWindow({ innerWidth: 1366, isTouch: true })
    expect(onDevice()).toBe('t')
  })

  it('iPad 直向（1024px 且為觸控）應回傳 t', () => {
    mockWindow({ innerWidth: 1024, isTouch: true })
    expect(onDevice()).toBe('t')
  })
})
