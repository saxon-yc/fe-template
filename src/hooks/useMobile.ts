import { useState, useEffect } from 'react'

export const useMobile = () => {
  const [isMobile, setMobile] = useState(window.innerWidth < 768)
  // 使用 ResizeObserver 监听根元素尺寸变化，避免监听整个窗口
  useEffect(() => {
    const root = document.documentElement // 监听 <html> 元素
    const resizeObserver = new ResizeObserver(() => {
      setMobile(root.clientWidth < 768)
    })
    resizeObserver.observe(root)
    return () => resizeObserver.disconnect()
  }, [])
  return isMobile
}
