import request from '@/utils/request'
// 角色列表
export const roleList = () => {
  return request({
    url: 'roles'
  })
}
