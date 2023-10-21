import request from '@/utils/request'

//文章详情
export const artGetChannelService = () => request.get('/my/cate/list')
export const artDeleteChannelService = (id) =>
  request.delete(`/my/cate/del`, { params: { id } })
export const artAddChannelService = (obj) => request.post('/my/cate/add', obj)

export const artEditChannelService = (obj) => request.put('/my/cate/info', obj)

//文章
export const artGetListService = (obj) =>
  request.get('/my/article/list', {
    params: obj
  })
export const artGetArticleService = (id) =>
  request.get('/my/article/info', { params: { id: id } })
//发布
export const artPublishArticleService = (data) => {
  return request.post('/my/article/add', data)
}
//更新
export const artUpdateArticleService = (data) => {
  return request.put('/my/article/info', data)
}
