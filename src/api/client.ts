// API客户端配置
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

// 通用请求配置
export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}

// 请求拦截器示例
export const createApiClient = () => {
  // 这里可以集成axios或其他HTTP客户端
  // 示例使用fetch
  const request = async (url: string, options: RequestInit = {}) => {
    const config = {
      ...options,
      headers: {
        ...apiConfig.headers,
        ...options.headers,
      },
    }

    const response = await fetch(`${API_BASE_URL}${url}`, config)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  return {
    get: (url: string) => request(url, { method: 'GET' }),
    post: (url: string, data: any) =>
      request(url, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    put: (url: string, data: any) =>
      request(url, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (url: string) => request(url, { method: 'DELETE' }),
  }
}

export const apiClient = createApiClient()
