import { describe, expect, it } from 'vitest'

import { enCrypto, hashHex } from '../_crypto'

describe('enCrypto', () => {
  it('字串加密後應為大寫十六進位', () => {
    const result = enCrypto('hello')
    expect(result).toMatch(/^[0-9A-F]+$/)
  })

  it('物件應先序列化再加密', () => {
    const result = enCrypto({ name: 'Brian' })
    expect(result).toMatch(/^[0-9A-F]+$/)
  })
})

describe('hashHex', () => {
  it('應回傳指定長度的字串', () => {
    expect(hashHex('test', 8)).toHaveLength(8)
    expect(hashHex('test', 16)).toHaveLength(16)
  })

  it('相同輸入應產生相同 hash', () => {
    expect(hashHex('abc', 10)).toBe(hashHex('abc', 10))
  })

  it('不同輸入應產生不同 hash', () => {
    expect(hashHex('abc', 10)).not.toBe(hashHex('xyz', 10))
  })
})
