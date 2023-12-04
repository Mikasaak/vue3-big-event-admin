import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'
const baseURL = 'http://big-event-vue-api-t.itheima.net/'

const instance = axios.create({
  baseURL,
  timeout: 10000
})
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    if (userStore.token) {
      // 如果有token，就添加到请求头中
      config.headers.Authorization = `${userStore.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code === 0) return response.data
    ElMessage.error(response.data.message || '未知错误')

    return Promise.reject(response.data)
  },
  function (error) {
    if (error.response.status === 401) {
      // 如果返回401
      router.push('/login')
    }
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElMessage.error(error.response.data.message || '未知错误')
    return Promise.reject(error)
  }
)
export default instance
export { baseURL }
