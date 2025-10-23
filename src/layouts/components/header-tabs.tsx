import React, { useState, useEffect } from 'react'
import { Tabs, Button, Dropdown, Menu } from 'antd'
import { CloseOutlined, ReloadOutlined, MoreOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from '@tanstack/react-router'

interface TabItem {
  key: string
  label: string
  closable?: boolean
}

interface HeaderTabsProps {
  className?: string
}

const HeaderTabs: React.FC<HeaderTabsProps> = ({ className }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeKey, setActiveKey] = useState<string>('/')
  const [tabs, setTabs] = useState<TabItem[]>([
    { key: '/', label: '首页', closable: false },
  ])

  // 路由标题映射
  const routeTitleMap: Record<string, string> = {
    '/': '首页',
    '/about': '关于',
  }

  // 监听路由变化，自动添加标签页
  useEffect(() => {
    const currentPath = location.pathname
    const currentTitle = routeTitleMap[currentPath] || '未知页面'

    setActiveKey(currentPath)

    // 检查是否已存在该标签页
    const existingTab = tabs.find(tab => tab.key === currentPath)
    if (!existingTab) {
      setTabs(prev => [
        ...prev,
        {
          key: currentPath,
          label: currentTitle,
          closable: currentPath !== '/', // 首页不可关闭
        },
      ])
    }
  }, [location.pathname])

  // 切换标签页
  const handleTabChange = (key: string) => {
    setActiveKey(key)
    navigate({ to: key })
  }

  // 关闭标签页
  const handleTabClose = (targetKey: string) => {
    const targetIndex = tabs.findIndex(tab => tab.key === targetKey)
    const newTabs = tabs.filter(tab => tab.key !== targetKey)

    setTabs(newTabs)

    // 如果关闭的是当前激活的标签页，需要切换到其他标签页
    if (targetKey === activeKey) {
      const newActiveKey =
        newTabs[targetIndex - 1]?.key || newTabs[0]?.key || '/'
      setActiveKey(newActiveKey)
      navigate({ to: newActiveKey })
    }
  }

  // 刷新当前页面
  const handleRefresh = () => {
    window.location.reload()
  }

  // 关闭其他标签页
  const handleCloseOthers = () => {
    const currentTab = tabs.find(tab => tab.key === activeKey)
    const homeTab = tabs.find(tab => tab.key === '/')

    const newTabs = [homeTab, currentTab].filter(Boolean) as TabItem[]
    setTabs(newTabs)
  }

  // 关闭所有标签页（除首页）
  const handleCloseAll = () => {
    const homeTab = tabs.find(tab => tab.key === '/')
    setTabs(homeTab ? [homeTab] : [])
    setActiveKey('/')
    navigate({ to: '/' })
  }

  // 更多操作菜单
  const moreMenu = (
    <Menu>
      <Menu.Item
        key='refresh'
        icon={<ReloadOutlined />}
        onClick={handleRefresh}
      >
        刷新页面
      </Menu.Item>
      <Menu.Item key='close-others' onClick={handleCloseOthers}>
        关闭其他
      </Menu.Item>
      <Menu.Item key='close-all' onClick={handleCloseAll}>
        关闭所有
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={`flex items-center ${className || ''}`}>
      <Tabs
        type='editable-card'
        activeKey={activeKey}
        onChange={handleTabChange}
        onEdit={(targetKey, action) => {
          if (action === 'remove') {
            handleTabClose(targetKey as string)
          }
        }}
        hideAdd
        className='flex-1 h-[40px]'
        items={tabs.map(tab => ({
          key: tab.key,
          label: tab.label,
          closable: tab.closable,
        }))}
      />

      <Dropdown overlay={moreMenu} trigger={['click']} placement='bottomRight'>
        <Button
          type='text'
          icon={<MoreOutlined />}
          size='small'
          className='ml-2'
        />
      </Dropdown>
    </div>
  )
}

export default HeaderTabs
