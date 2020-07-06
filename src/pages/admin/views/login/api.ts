import http from '@/utils/http'

export const checkLogin = (data: any) => http({
  url: '/api/login',
  method: 'post',
  data: {
    ...data
  }
})
