import http from '../../utils/request'
import Ajax from 'Ajax'
export interface IEssayParam {
  title: string
  type: string
  content: string
}

export const getList = (params?: any) => http<Ajax.IData<any[]>>({
  url: '/api/v2/essay',
  method: 'get',
  params: {
    ...params
  }
})
