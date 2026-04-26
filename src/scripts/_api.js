import axios from 'axios'

import { ENV, isDevMode } from './_env.js'

const apiRequest = axios.create({
  baseURL: isDevMode ? '/' : ENV.VITE_APP_APIPATH,
})

apiRequest.interceptors.request.use(
  (config) => {
    const { method, params, data, url } = config

    // 處理 URL 中 {param}
    const urlParams = (paramsOrData) => {
      const apiParams = paramsOrData?.apiParams || null
      let tempUrl = url
      if (apiParams) {
        Object.keys(apiParams).forEach((key) => {
          tempUrl = tempUrl.replace(new RegExp('{${key}}'), apiParams[key])
        })
      }
      return tempUrl
    }

    // 去掉 apiParams 與 formData
    const returnDatas = (datas) => {
      const result = {}
      if (datas) {
        Object.keys(datas).forEach((key) => {
          if (key !== 'apiParams' && key !== 'formData') {
            result[key] = datas[key]
          }
        })
      }
      return result
    }

    // 自動切 token (這次不使用 LINE LIFF 登入)
    // const token = liff.idToken
    // config.headers['X-LINE-IDToken'] = token

    if (method === 'get') {
      config.url = urlParams(params)
      config.params = {
        ...returnDatas(params),
        // lineIdToken: token,
      }
    } else {
      config.url = urlParams(data)
      config.data = {
        ...returnDatas(data),
        // lineIdToken: token,
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)

/**
 * API 請求處理
 * @type {TryCatchApi}
 */
const tryCatchApi = async (request, type, apiPath, data) => {
  try {
    if (type === 'get') {
      return await request.get(apiPath, { params: data })
    } else {
      return await request[type](apiPath, data)
    }
  } catch (error) {
    return error.response || { status: 500, data: { message: 'API 錯誤' } }
  }
}

/**
 * 取得 GUID
 * @type {FetchInitAsync}
 */
export const fetchInit = () => tryCatchApi(apiRequest, 'get', 'init')

/**
 * 取得網站狀態
 * @type {FetchStatusSiteAsync}
 */
export const fetchStatusSite = () => tryCatchApi(apiRequest, 'get', 'status/site')

/**
 * 取得遊戲狀態
 * @type {FetchStatusGameAsync}
 */
export const fetchStatusGame = (data) => tryCatchApi(apiRequest, 'get', 'status/game', data)

/**
 * 完成遊戲
 * @type {FetchGameAsync}
 */
export const fetchGame = (data) => tryCatchApi(apiRequest, 'post', 'game', data)

/**
 * 註冊個人資料
 * @type {FetchRegisterAsync}
 */
export const fetchRegister = (data) => tryCatchApi(apiRequest, 'post', 'register', data)

export const fetchTag = (data) => tryCatchApi(apiRequest, 'get', 'tag', data)
