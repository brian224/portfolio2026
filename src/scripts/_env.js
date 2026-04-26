/**
 * 環境參數
 * @type {EvnConfig}
 */
export const ENV = import.meta.env

/** 是否為本地開發環境 */
export const isDevMode = ENV.VITE_APP_MODE === 'dev'
