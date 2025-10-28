import type { CreateClientConfig } from '@/service/client.gen'
import { apiClient } from './request'

/**
 * 自定义客户端配置，使用我们的request.ts中的axios实例
 * 这样生成的API代码将使用我们自定义的拦截器
 */
export const createClientConfig: CreateClientConfig = config => ({
  ...config,
  // 使用我们自定义的axios实例，它包含了认证、错误处理等拦截器
  axios: apiClient,
  // 强制设置 baseURL 为空字符串，让 axios 实例的 baseURL 生效
  baseURL: '',
})
