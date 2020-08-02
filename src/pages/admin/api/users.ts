import http from '@/utils/http'

export const checkLogin = (username: string, password: string) => http({
  url: '/api/users/token',
  method: 'post',
  data: `username=${username}&password=${password}&grant_type=password`,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic bXlfY2xpZW50SWQ6bXlfY2xpZW50X3NlY3JldA=='
  }
})
