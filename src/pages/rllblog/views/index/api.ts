import http from '@/utils/http'

export const getList = () => http({
  url: '/api/v2/essay',
  method: 'get'
})
