import request from '@/utils/request'

/**
 * 获取文章列表
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function articleGetChannelListService() {
  return request.get('/my/cate/list')
}

/**
 * 添加文章分类
 * @param cate_name
 * @param cate_alias
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function articleAddChannelService({ cate_name, cate_alias }) {
  return request.post('/my/cate/add', { cate_name, cate_alias })
}

/**
 * 获取更新文章分类
 * @param id
 * @param cate_name
 * @param cate_alias
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function articleUpdateChannelService({ id, cate_name, cate_alias }) {
  return request.put('/my/cate/info', { id, cate_name, cate_alias })
}

/**
 *删除文章分类
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function articleDeleteChannelService(id) {
  return request.delete('/my/cate/del', {
    params: { id }
  })
}

/**
 * 获取文章列表
 * @param pagenum
 * @param pagesize
 * @param cate_id
 * @param state
 *
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function articleGetListService({ pagenum, pagesize, cate_id, state }) {
  return request.get('/my/article/list', {
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}

/**
 *
 * @param id {string} 文章id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function articleDeleteArticleService(id) {
  return request.delete(`/my/article/info`, {
    params: { id }
  })
}

/**
 * 获取文章详情
 * @param id {string}
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function articleGetArticleDetailService(id) {
  return request.get(`/my/article/info`, {
    params: { id }
  })
}

/**
 * 添加文章
 * @param data
 * @param data.title {string} 文章标题
 * @param data.content {string} 文章内容
 * @param data.cate_id {string} 文章分类
 * @param data.cover_img {string} 封面图片地址
 * @param data.state {string} 文章状态，0为草稿，1为待审核，2为审核通过，3为审核失败

 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function articleAddArticleService(data) {
  return request.post(`/my/article/add`, data)
}

/**
 * 更新文章
 * @param data
 * @param data.title {string} 文章标题
 * @param data.content {string} 文章内容
 * @param data.cate_id {string} 文章分类
 * @param data.cover_img {string} 封面图片地址
 * @param data.state {string} 文章状态，0为草稿，1为待审核，2为审核通过，3为审核失败
 * @param data.id {string} 文章id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function articleUpdateArticleService(data) {
  return request.put(`/my/article/info`, data)
}
