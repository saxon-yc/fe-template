import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from '@tanstack/react-router'

import Logo from './logo'
import { SIDE_MENUS } from '@/constants/menus'
import SvgIcon from '@/components/svg-icon'
const { Sider } = Layout

interface SideMenuProps {
  collapsed: boolean
  themeMode: 'light' | 'dark'
  width: number
}
export default function SideMenu({
  collapsed,
  themeMode,
  width,
}: SideMenuProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname.split('?')[0]
  console.log(currentPath)
  const getMenus = (menus: any[]): any[] => {
    return menus.map(item => {
      const menuItem: any = {
        ...item,
        icon: item.icon ? (
          <SvgIcon icon={item.icon} className='!text-[20px]' />
        ) : undefined,
      }
      // 递归处理 children
      if (item.children && item.children.length > 0) {
        menuItem.children = getMenus(item.children)
      }
      return menuItem
    })
  }

  return (
    <Sider
      breakpoint='lg'
      // collapsedWidth='0'
      width={width}
      trigger={null}
      collapsible
      collapsed={collapsed}
      className={`shadow-sm ${themeMode === 'dark' ? '!bg-[#141414]' : '!bg-[#fff]'}`}
    >
      <Logo collapsed={collapsed} />
      <Menu
        className='!border-none'
        mode='inline'
        defaultOpenKeys={['/']}
        selectedKeys={[currentPath]}
        items={getMenus(SIDE_MENUS)}
        onSelect={e => {
          navigate({ to: e.key })
        }}
      />
    </Sider>
  )
}
