import React from 'react'
import { Breadcrumb, Button } from 'antd'
import { HomeOutlined, LeftOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { menus } from '@/constants/menus'
import SvgIcon from '@/components/svg-icon'

interface BreadcrumbItem {
  title: string
  path?: string
  icon?: string
}

interface EnhancedBreadcrumbProps {
  className?: string
}

const EnhancedBreadcrumb: React.FC<EnhancedBreadcrumbProps> = ({
  className,
}) => {
  const location = useLocation()
  const navigate = useNavigate()

  // 生成面包屑路径
  const generateBreadcrumbItems = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const items: BreadcrumbItem[] = []
    const home = menus.find(item => item.key === 'home')

    items.push({
      title: home?.label || '首页',
      icon: home?.icon || 'home',
      path: home?.path,
    })

    // 构建路径并添加面包屑项
    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const config = menus.find(item => item.path === currentPath)

      if (config) {
        items.push({
          title: config.label,
          path: currentPath,
          icon: config.icon,
        })
      } else {
        // 如果没有配置，使用路径段作为标题
        items.push({
          title: segment.charAt(0).toUpperCase() + segment.slice(1),
          path: currentPath,
        })
      }
    })

    return items
  }

  const breadcrumbItems = generateBreadcrumbItems()

  // 面包屑点击处理
  const handleBreadcrumbClick = (path: string) => {
    if (path && path !== location.pathname) {
      navigate({ to: path })
    }
  }

  return (
    <div className={`flex items-center gap-3 ${className || ''}`}>
      {/* 面包屑导航 */}
      <Breadcrumb
        separator='/'
        items={breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1
          const isClickable = item.path && !isLast
          return {
            title: (
              <span
                className={`flex items-center gap-1 ${
                  isClickable
                    ? 'cursor-pointer hover:text-blue-500 transition-colors'
                    : isLast
                      ? 'text-gray-900 dark:text-gray-100 font-medium'
                      : 'text-gray-500'
                }`}
                onClick={() => item.path && handleBreadcrumbClick(item.path)}
              >
                <SvgIcon icon={item.icon} className='text-[18px]' />
                {item.title}
              </span>
            ),
          }
        })}
      />
    </div>
  )
}

export default EnhancedBreadcrumb
