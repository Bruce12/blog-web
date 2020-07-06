import axios from 'axios'
import config from '@/../config'

const service = axios.create({
  baseURL: config.baseUrl,
  timeout: 5000
})

// 请求
service.interceptors.request.use(
  (config) => {
    //
    // console.log(config)
    return config
  },
  (error) => {
    // console.log(error)
    Promise.reject(error)
  }
)
// 响应
service.interceptors.response.use(
  (response) => {
    const data = response.data
    if (data.status !== 0) return Promise.reject(response)
    return Promise.resolve(data)
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
