import http from '@/utils/http'
import Ajax from 'Ajax'

export interface IEssayParam {
  title: string
  type: string
  content: string
}

export const getList = (params: any) => http<Ajax.IData<any[]>>({
  url: '/api/v2/essay',
  method: 'get',
  params: {
    ...params
  }
})
/**
  保存
 */
export const saveEssay = (data: IEssayParam) => http({
  url: `/api/v2/essay`,
  method: 'post',
  data
})
/**
 * 编辑
 */
export const editEssay = (id: string, data: any) => http({
  url: `/api/v2/essay/${id}`,
  method: 'put',
  data: {
    ...data
  }
})
