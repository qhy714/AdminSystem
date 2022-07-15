import request from '@/utils/request'
/* 登录 */
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {
      username,
      password
    }
  })
}

/**
 * 用户管理
 */
export const UserAdmin = ({ pagenum, pagesize }) => {
  return request({
    url: 'users',
    params: {
      pagenum,
      pagesize
    }
  })
}

/**
 *修改用户状态
 */
export const UserState = ({ uId, type }) => {
  return request({
    url: `users/${uId}/state/${type}`,
    method: 'PUT'
  })
}
