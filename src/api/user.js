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
 * 用户数据列表
 */
export const UserAdmin = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'users',
    params: {
      query,
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

/**
 * 把修改后的用户信息发送给服务器
 */
export const EditUserData = ({ id, email, mobile }) => {
  return request({
    url: `users/${id}`,
    method: 'PUT',
    data: {
      email,
      mobile

    }
  })
}

/**
 * 添加用户
 */
export const AddUser = (data) => {
  return request({
    url: 'users',
    method: 'POST',
    data
  })
}

/**
 * 删除用户
 */
export const DeleteUser = (id) => {
  return request({
    url: `users/${id}`,
    method: 'DELETE'

  })
}
