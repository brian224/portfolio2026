import CryptoJS from 'crypto-js'

export const KEY = CryptoJS.enc.Utf8.parse('_CiRo_CrypToJS_1923_')
export const IV = CryptoJS.enc.Utf8.parse('_1923__191199026718_')
export const enCrypto = (string) => {
  const content = typeof string !== 'string' ? JSON.stringify(string) : string
  const srcs = CryptoJS.enc.Utf8.parse(content)
  const encrypted = CryptoJS.AES.encrypt(srcs, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.ciphertext.toString().toUpperCase()
}

export const deCrypto = (string) => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(string)
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(srcs, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  const decryptContent = decryptedStr.toString()
  return /^({|\[).*(}|\])$/.test(decryptContent)
    ? JSON.parse(decryptContent)
    : decryptContent
}

export const hashHex = (string, length) => {
  return enCrypto(string)
    .toLocaleLowerCase()
    .split('')
    .reverse()
    .join('')
    .slice(0, length)
}
