import { afterEach, describe, expect, it, vi } from 'vitest'

import { onDevice } from '../_prototype'

function mockWindow({ innerWidth = 1280, orientationAngle = 0, userAgent = '' } = {}) {
  vi.stubGlobal('innerWidth', innerWidth)
  vi.stubGlobal('screen', { orientation: { angle: orientationAngle } })
  vi.stubGlobal('navigator', { userAgent })
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('onDevice — PC', () => {
  it('桌機寬度 1280 應回傳 p', () => {
    mockWindow({ innerWidth: 1280 })
    expect(onDevice()).toBe('p')
  })

  it('寬度 1024 應回傳 p', () => {
    mockWindow({ innerWidth: 1024 })
    expect(onDevice()).toBe('p')
  })
})

describe('onDevice — mobile', () => {
  it('寬度 ≤ 740 應回傳 m', () => {
    mockWindow({ innerWidth: 740 })
    expect(onDevice()).toBe('m')
  })

  it('Android userAgent 應回傳 m', () => {
    mockWindow({ innerWidth: 1280, userAgent: 'Mozilla/5.0 (Linux; Android 13) AppleWebKit' })
    expect(onDevice()).toBe('m')
  })

  it('iPhone userAgent 應回傳 m', () => {
    mockWindow({ innerWidth: 390, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)' })
    expect(onDevice()).toBe('m')
  })
})

describe('onDevice — tablet', () => {
  it('iPad userAgent 應回傳 t', () => {
    mockWindow({ innerWidth: 1024, userAgent: 'Mozilla/5.0 (iPad; CPU OS 16_0)' })
    expect(onDevice()).toBe('t')
  })

  it('桌機模擬平板尺寸（741-1023px，角度 0）應回傳 t', () => {
    mockWindow({ innerWidth: 900, orientationAngle: 0 })
    expect(onDevice()).toBe('t')
  })

  it('iOS 17+ 橫置（angle ≠ 0，Mac OS X userAgent）應回傳 t', () => {
    mockWindow({
      innerWidth: 1024,
      orientationAngle: 90,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)',
    })
    expect(onDevice()).toBe('t')
  })
})
