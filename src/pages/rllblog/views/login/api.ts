import http from '@/utils/http'

export const checkLogin = (params: any) => http({
  url: '/api/users/token',
  method: 'post',
  data: `username=${params.username}&password=${params.password}&grant_type=password`,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic bXlfY2xpZW50SWQ6bXlfY2xpZW50X3NlY3JldA=='
  }
})
