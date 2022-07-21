import request from '@/utils/request'
// 角色列表
export const roleList = () => {
  return request({
    url: 'roles'
  })
}

export const roleAuthorize = (id, rids) => {
  return request({
    url: `roles/${id}/rights`,
    method: 'POST',
    data: {
      rids
    }
  })
}
