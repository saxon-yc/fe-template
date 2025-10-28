import { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import { useNavigate, useLocation } from '@tanstack/react-router'

import { SIDE_MENUS } from '@/constants/menus'
import { findMenuItem } from '@/utils'
import SvgIcon from '@/components/svg-icon'

interface HeaderTabsProps {
  themeMode?: 'light' | 'dark'
}

export default function HeaderTabs({ themeMode }: HeaderTabsProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeKey, setActiveKey] = useState<string>('/')
  const [tabs, setTabs] = useState<GlobalType.RouteTabItem[]>([
    {
      ...(({ ...rest } = SIDE_MENUS.find(item => item.path === '/')!) => ({
        ...rest,
        keepAlive: rest.keepAlive ?? true,
      }))(),
      closable: false,
    },
  ])

  console.log('tabs', tabs)

  // 监听路由变化，自动添加标签页
  useEffect(() => {
    const currentPath = location.pathname
    console.log('currentPath', currentPath)

    setActiveKey(currentPath)

    // 检查是否已存在该标签页
    const existingTab = tabs.find(tab => tab.path === currentPath)
    if (!existingTab) {
      // 递归查找菜单项（含子菜单）
      const tabItem = findMenuItem(SIDE_MENUS, currentPath)!
      console.log('tabItem', tabItem)

      setTabs(prev => {
        const newTabs = prev.some(tab => tab.path === tabItem.path)
          ? prev
          : [
              ...prev,
              {
                ...tabItem,
                closable: tabItem.path !== '/', // 首页不可关闭
              },
            ]
        return newTabs
      })
    }
  }, [location.pathname])

  // 切换标签页
  const handleTabChange = (key: string) => {
    setActiveKey(key)
    navigate({ to: key })
  }

  // 关闭标签页
  const handleTabClose = (targetKey: string) => {
    const targetIndex = tabs.findIndex(tab => tab.path === targetKey)
    const newTabs = tabs.filter(tab => tab.path !== targetKey)

    setTabs(newTabs)

    // 如果关闭的是当前激活的标签页，需要切换到其他标签页
    if (targetKey === activeKey) {
      const newActiveKey =
        newTabs[targetIndex - 1]?.path || newTabs[0]?.path || '/'
      setActiveKey(newActiveKey)
      navigate({ to: newActiveKey })
    }
  }

  return (
    <div
      className={`h-[40px] px-[20px] shadow-sm z-1 ${themeMode === 'dark' ? 'bg-[#141414]' : 'bg-[#ffffff]'}  dark:border-gray-700`}
    >
      <div className={`h-[40px] flex items-center`}>
        <Tabs
          type='editable-card'
          hideAdd
          activeKey={activeKey}
          onChange={handleTabChange}
          onEdit={(targetKey, action) => {
            if (action === 'remove') {
              handleTabClose(targetKey as string)
            }
          }}
          className='flex-1 h-[34px] !m-[0px] custom-header-tabs'
          items={tabs.map(tab => ({
            key: tab.path,
            label: (
              <div className='flex items-center gap-2'>
                {tab.icon && <SvgIcon icon={tab.icon} />}
                <span className='text-[14px]'>{tab.label}</span>
              </div>
            ),
            closable: tab.closable,
          }))}
        />
      </div>
    </div>
  )
}
