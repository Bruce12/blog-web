import http from '@/utils/http'
import Ajax from 'Ajax'

export const getList = (params: any) => http<Ajax.IData<any[]>>({
  url: '/api/v2/essay',
  method: 'get',
  params: {
    ...params
  }
})
