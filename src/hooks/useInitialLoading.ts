import { useState, useEffect } from 'react'

export function useInitialLoading(minLoadingTime = 1500) {
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    // 确保加载动画至少显示指定时间
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, minLoadingTime)

    // 监听页面加载完成事件
    const handleLoad = () => {
      // 如果页面已经加载完成，但还没到最小时间，继续等待
      if (document.readyState === 'complete') {
        setTimeout(
          () => {
            setIsInitialLoading(false)
          },
          Math.max(0, minLoadingTime - performance.now())
        )
      }
    }

    // 如果页面已经加载完成
    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', handleLoad)
    }
  }, [minLoadingTime])

  return isInitialLoading
}
