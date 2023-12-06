import request from '@/utils/request'

export function articleGetChannelListService() {
  return request.get('/my/cate/list')
}

export function articleAddChannelService({ cate_name, cate_alias }) {
  return request.post('/my/cate/add', { cate_name, cate_alias })
}

export function articleUpdateChannelService({ id, cate_name, cate_alias }) {
  return request.put('/my/cate/info', { id, cate_name, cate_alias })
}

export function articleDeleteChannelService(id) {
  return request.delete('/my/cate/del', {
    params: { id }
  })
}
