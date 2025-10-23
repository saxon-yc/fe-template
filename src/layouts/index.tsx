import { useState } from 'react'
import {
  HomeOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { Layout, Menu, Button, FloatButton, Tooltip } from 'antd'

import { usePageSettingStore } from '@/stores/usePageSettingStore'
import HeaderTabs from './components/header-tabs'
import HeaderActions from './components/header-actions'
import EnhancedBreadcrumb from './components/enhanced-breadcrumb'
import Logo from './components/logo'
import SideMenu from './components/side-menu'
import SvgIcon from '@/components/svg-icon'

const { Header, Content, Sider } = Layout

interface AdminLayoutProps {
  children?: React.ReactNode
}
export default function AdminLayout({ children }: AdminLayoutProps) {
  const { themeMode } = usePageSettingStore()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>
      <SideMenu collapsed={collapsed} themeMode={themeMode} />
      <Layout>
        {/* 主头部区域 */}
        <Header
          className={`!h-[56px] flex justify-between items-center !px-[20px] ${themeMode === 'dark' ? '!bg-[#141414]' : '!bg-[#fff]'} border-b border-gray-200 dark:border-gray-700`}
        >
          {/* 左侧：折叠按钮 + 面包屑 */}
          <div className='flex items-center gap-3'>
            <Tooltip title={collapsed ? '展开菜单' : '折叠菜单'}>
              <Button
                type='text'
                styles={{ icon: { fontSize: '20px' } }}
                icon={
                  collapsed ? (
                    <SvgIcon icon='mdi:menu-close' className='text-[20px]' />
                  ) : (
                    <SvgIcon icon='mdi:menu-open' className='text-[20px]' />
                  )
                }
                onClick={() => setCollapsed(!collapsed)}
                size='small'
              />
            </Tooltip>
            <EnhancedBreadcrumb />
          </div>

          {/* 右侧：操作区域 */}
          <HeaderActions />
        </Header>

        {/* 标签页导航区域 */}
        <div
          className={`h-[40px] ${themeMode === 'dark' ? 'bg-[#1f1f1f]' : 'bg-[#ffffff]'} border-gray-200 dark:border-gray-700 px-[20px]`}
        >
          <HeaderTabs className='h-full' />
        </div>

        <Content
          id='CONTENT_CONTAINER_ID'
          className='p-[20px] h-[calc(100vh-96px)] overflow-y-auto'
        >
          {children}
          <FloatButton.BackTop
            visibilityHeight={200}
            target={() =>
              document.getElementById('CONTENT_CONTAINER_ID') as HTMLElement
            }
          />
        </Content>
      </Layout>
    </Layout>
  )
}
