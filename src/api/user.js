import request from '@/utils/request'

export function userRegisterService({ username, password, repassword }) {
  return request.post('/api/reg', { username, password, repassword })
}

export function userLoginService({ username, password }) {
  return request.post('/api/login', { username, password })
}
export function userGetInfoService() {
  return request.get('/my/userinfo')
}
