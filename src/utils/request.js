import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://localhost:63070', // 修改为你的后端接口基础地址
  timeout: 50000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送前做一些处理
    const token = localStorage.getItem('token')
    if (token) {
      // 让每个请求携带token
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 根据自己的业务逻辑处理响应数据
    if (res.code !== 0) {
      console.error('请求响应错误:', res.msg || '系统错误') // 仅在控制台打印错误信息
      return res;
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // 仅在控制台打印错误信息
    return Promise.reject(error)
  }
)

export default service