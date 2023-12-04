import request from '@/utils/request'

export function articleGetChannelListService() {
  return request.get('/my/cate/list')
}
