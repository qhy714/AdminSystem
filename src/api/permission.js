import request from '@/utils/request'
export const permissionList = () => {
  const type = 'list'
  return request({
    url: `rights/${type}`
  })
}
