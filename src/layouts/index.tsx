import { useState, useEffect } from 'react'
import { Layout, Button, FloatButton, Tooltip } from 'antd'

import { usePageSettingStore } from '@/stores/usePageSettingStore'
import HeaderTabs from './components/header-tabs'
import HeaderActions from './components/header-actions'
import EnhancedBreadcrumb from './components/enhanced-breadcrumb'
import SideMenu from './components/side-menu'
import SvgIcon from '@/components/svg-icon'

const { Header, Content } = Layout

interface AdminLayoutProps {
  children?: React.ReactNode
}
const AsideWidth = 220
export default function AdminLayout({ children }: AdminLayoutProps) {
  const { themeMode } = usePageSettingStore()
  const [collapsed, setCollapsed] = useState(false)

  // 监听主题模式变化，同步到 DOM 的 data-theme 属性
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode)
  }, [themeMode])

  return (
    <Layout hasSider>
      <SideMenu
        collapsed={collapsed}
        themeMode={themeMode}
        width={AsideWidth}
      />
      {/* {isMobile && (
        <div
          style={{ width: `calc(100vw - ${AsideWidth}px)` }}
          className={`backdrop-blur-[1px] fixed left-[${AsideWidth}px] right-0 top-0 bottom-0 z-2 transition-all duration-300`}
        />
      )} */}
      <Layout>
        {/* 主头部区域 */}
        <Header
          className={`!h-[56px] z-1 !px-[0px] ${themeMode === 'dark' ? '!bg-[#141414]' : '!bg-[#fff]'}`}
        >
          <div className='px-[12px] h-full w-full shadow-sm flex justify-between items-center '>
            {/* 左侧：折叠按钮 + 面包屑 */}
            <div className='flex items-center gap-3'>
              <Tooltip title={collapsed ? '展开菜单' : '折叠菜单'}>
                <Button
                  type='text'
                  styles={{ icon: { fontSize: '20px' } }}
                  icon={
                    collapsed ? (
                      <SvgIcon
                        icon='line-md:menu-fold-right'
                        className='text-[20px]'
                      />
                    ) : (
                      <SvgIcon
                        icon='line-md:menu-fold-left'
                        className='text-[20px]'
                      />
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
          </div>
        </Header>
        {/* 标签页导航区域 */}
        <HeaderTabs themeMode={themeMode} />

        <Content
          id='CONTENT_CONTAINER_ID'
          className='p-[16px] h-[calc(100vh-96px)] overflow-y-auto'
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
