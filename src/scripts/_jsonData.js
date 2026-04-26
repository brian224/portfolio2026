import axios from 'axios'

// 取得 json 資料
export const jsonRequest = axios.create({
  baseURL: 'static/json',
})

jsonRequest.interceptors.request.use(
  (config) => {
    config.url = `${config.url}.json?${+new Date()}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const jsonGet = async (path) => {
  try {
    return await jsonRequest.get(path)
  } catch (error) {
    return error.response
  }
}
