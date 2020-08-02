import axios from 'axios'
import config from '../config'
import { UserModule } from '../store/modules/user'
import { getToken } from '../utils/cookies'
import { MessageBox } from 'element-ui'

const service = axios.create({
  baseURL: config.baseUrl,
  timeout: 5000
})

// 请求
service.interceptors.request.use(
  (config) => {
    console.log(UserModule.token)
    if (UserModule.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
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
    // 未授权
    console.log(response)
    if (response.status !== 200 && data.status !== 0) return Promise.reject(response)
    return Promise.resolve(data)
  },
  (error) => {
    MessageBox.alert(
      '您当前没有权限访问！',
      '请登录',
      {
        confirmButtonText: '重新登录',
        type: 'warning',
        callback: action => {
          UserModule.ResetToken()
          // 去登录页面
          location.href = config.loginUrl
        }
      }
    )
    return Promise.reject(error)
  }
)

export default service
