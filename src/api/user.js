import request from '@/utils/request.js'

export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('api/reg', { username, password, repassword })
}
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

export const getUserInfoService = () => request.get('/my/userinfo')

//修改个人资料

export const updateUserInfoService = (obj) => request.put('/my/userinfo', obj)
//上传头像
export const updateAvatarService = (pic) =>
  request.patch('/my/update/avatar', {
    avatar: pic
  })

export const updatePasswordService = (obj) =>
  request.patch('/my/updatepwd', obj)
