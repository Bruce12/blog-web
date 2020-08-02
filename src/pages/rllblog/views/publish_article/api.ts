import http from '@/utils/http'

export interface IEssayParam {
  title: string
  type: string
  content: string
}

export const getDictList = (type: string) => http({
  url: `/api/v2/dict/${type}`
})
export const saveEssay = (data: IEssayParam) => http({
  url: `/api/v2/essay`,
  method: 'post',
  data
})
