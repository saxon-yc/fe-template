import { message } from 'antd'
import { useState } from 'react'

import { DOWNLOAD_STATUS } from '@/constants/enum'
import { useAccountStore } from '@/stores/useAccountStore'

interface Config {
  url: string
  filename?: string
  headers?: Record<string, string>
  method?: 'GET' | 'POST'
  body?: object | FormData
}

/**
 * 通用文件下载方法
 * @param {Object} config 配置项
 * @param {string} config.url - 下载地址（必填）
 * @param {string} [config.filename] - 自定义文件名（可选，默认从响应头解析）
 * @param {Object} [config.headers] - 自定义请求头（如添加 Token）
 * @param {'GET'|'POST'} [config.method='GET'] - 请求方法
 * @param {Object} [config.body] - POST 请求体（需配合 method: 'POST'）
 */

export default function useDownload() {
  const { token } = useAccountStore()

  const [percent, setPercent] = useState(0)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(DOWNLOAD_STATUS.not_download)

  const onDownload = async (config: Config) => {
    const { url, filename, headers = {}, method = 'GET', body } = config
    try {
      // 1. 发起 fetch 请求（支持跨域和自定义请求头）
      setLoading(true)
      setStatus(DOWNLOAD_STATUS.downloading)
      const response = await fetch(url, {
        method,
        headers: { ...headers, Authorization: token },
        body: method === 'POST' ? JSON.stringify(body) : null,
      })

      if (!response.ok) {
        setLoading(false)
        setStatus(DOWNLOAD_STATUS.download_error)
        throw new Error(`下载失败: ${response.status} ${response.statusText}`)
      }

      // 2. 解析文件名（优先级：手动指定 > Content-Disposition > 默认名）
      let finalFilename = filename
      const disposition = response.headers.get('Content-Disposition') || ''
      const filenameMatch = disposition.match(/filename\*?=([^;]+)/i)
      if (filenameMatch) {
        finalFilename = decodeURIComponent(
          filenameMatch[1].replace(/utf-8''/i, '')
        ).replace(/["']/g, '')
      } else {
        if (finalFilename) {
          const ext = url.slice(url.lastIndexOf('.'))
          finalFilename = `${filename}${ext}`
        } else {
          const ext = url.slice(url.lastIndexOf('.'))
          finalFilename = `download-${Date.now()}${ext}`
        }
      }

      // 3. 处理大文件分块下载与进度监听
      const contentLength = +(response.headers.get('Content-Length') || 0)
      const reader = response.body?.getReader()
      let receivedLength = 0
      const chunks = []

      while (true) {
        const { done, value } = (await reader?.read()) as {
          done: boolean
          value: Uint8Array
        }
        if (done) break

        chunks.push(value)
        receivedLength += value.length

        // 触发进度回调（如果内容长度未知则返回 -1）
        const pt = contentLength
          ? Math.round((receivedLength / contentLength) * 100)
          : -1

        setPercent(p => p + pt)
      }
      // 4. 合并数据并创建 Blob
      const blob = new Blob(chunks)
      const blobUrl = window.URL.createObjectURL(blob)

      // 5. 通过 <a> 元素触发下载
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = finalFilename
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()

      // 6. 清理资源
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)

      setLoading(false)
      setStatus(DOWNLOAD_STATUS.download_success)
      message.success('资源下载成功')
    } catch (err) {
      setPercent(0)
      setLoading(false)
      setStatus(DOWNLOAD_STATUS.download_error)

      // 触发错误回调
      console.error('文件下载失败:', err)
    }
  }

  return {
    percent,
    loading,
    status,
    onDownload,
  }
}
