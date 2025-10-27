import { Breadcrumb, Dropdown, Menu } from 'antd'
import { useLocation, useNavigate } from '@tanstack/react-router'

import { SIDE_MENUS } from '@/constants/menus'
import SvgIcon from '@/components/svg-icon'
import { findMenuItem } from '@/utils'

interface BreadcrumbItem {
  title: string
  path?: string
  icon?: string
  children?: any[]
}

interface EnhancedBreadcrumbProps {
  className?: string
}

export default function EnhancedBreadcrumb({
  className,
}: EnhancedBreadcrumbProps) {
  const location = useLocation()
  const navigate = useNavigate()

  // 生成面包屑路径
  const generateBreadcrumbItems = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const items: BreadcrumbItem[] = []
    const home = SIDE_MENUS.find(item => item.key === '/')

    items.push({
      title: home?.label || '首页',
      icon: home?.icon || 'home',
      path: home?.path,
    })

    // 构建路径并添加面包屑项
    let currentPath = ''
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`

      // 递归查找菜单项（含子菜单）
      const config = findMenuItem(SIDE_MENUS, currentPath)!

      if (config) {
        items.push({
          title: config.label,
          path: currentPath,
          icon: config.icon,
          children: config.children, // 直接使用当前菜单项的children
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

  // 创建下拉菜单
  const createDropdownMenu = (children: any[], currentPath: string) => {
    const menuItems = children.map(child => ({
      key: child.path,
      label: (
        <span className='flex items-center gap-2'>
          {child.icon && <SvgIcon icon={child.icon} className='text-[16px]' />}
          {child.label}
        </span>
      ),
    }))

    return (
      <Menu
        selectedKeys={[currentPath]}
        items={menuItems}
        onClick={({ key }) => handleBreadcrumbClick(key)}
      />
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className || ''}`}>
      {/* 面包屑导航 */}
      <Breadcrumb
        separator='/'
        items={breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1
          const hasDropdown = item.children && item.children.length > 0
          const isClickable = item.path && !isLast && !hasDropdown

          const breadcrumbContent = (
            <span
              className={`flex items-center gap-1 ${
                isClickable
                  ? 'cursor-pointer hover:text-blue-500 transition-colors'
                  : isLast
                    ? 'text-gray-900 dark:text-gray-100 font-medium'
                    : hasDropdown
                      ? 'cursor-pointer hover:text-blue-500 transition-colors'
                      : 'text-gray-500'
              }`}
              onClick={() => {
                if (isClickable && item.path) {
                  handleBreadcrumbClick(item.path!)
                }
              }}
            >
              {item.icon && (
                <SvgIcon icon={item.icon} className='text-[18px]' />
              )}
              {item.title}
              {hasDropdown && (
                <SvgIcon
                  icon='mdi:chevron-down'
                  className='text-[14px] opacity-60'
                />
              )}
            </span>
          )

          return {
            title: hasDropdown ? (
              <Dropdown
                overlay={createDropdownMenu(item.children!, location.pathname)}
                trigger={['click']}
                placement='bottomLeft'
              >
                {breadcrumbContent}
              </Dropdown>
            ) : (
              breadcrumbContent
            ),
          }
        })}
      />
    </div>
  )
}
