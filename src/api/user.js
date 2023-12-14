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

/**
 *
 * @param id
 * @param username
 * @param nickname
 * @param email
 * @param user_pic
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function userUpdateInfoService({ id, username, nickname, email }) {
  return request.put('/my/userinfo', {
    id,
    username,
    nickname,
    email
  })
}

export function userUpdateAvatarService(avatar) {
  return request.patch('/my/update/avatar', { avatar })
}

export function userUpdatePasswordService({ old_pwd, new_pwd, re_pwd }) {
  return request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
}
