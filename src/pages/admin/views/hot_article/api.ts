import http from '@/utils/http'

export const getList = (params: any) => http({
  url: '/api/v2/essay',
  method: 'get',
  params: {
    ...params
  }
})
