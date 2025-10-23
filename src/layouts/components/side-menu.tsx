import { Layout, Menu } from 'antd'
import Logo from './logo'
import { menus } from '@/constants/menus'
import { useNavigate } from '@tanstack/react-router'
import SvgIcon from '@/components/svg-icon'
const { Sider } = Layout

interface SideMenuProps {
  collapsed: boolean
  themeMode: 'light' | 'dark'
}
export default function SideMenu({ collapsed, themeMode }: SideMenuProps) {
  const navigate = useNavigate()
  return (
    <Sider
      width={220}
      trigger={null}
      collapsible
      collapsed={collapsed}
      className={`shadow-sm ${themeMode === 'dark' ? '!bg-[#141414]' : '!bg-[#fff]'}`}
    >
      <Logo collapsed={collapsed} />
      <Menu
        mode='inline'
        defaultSelectedKeys={[location.pathname]}
        items={menus.map(item => ({
          ...item,
          icon: <SvgIcon icon={item.icon} className='text-[18px]' />,
        }))}
        onSelect={({ key }) => {
          navigate({ to: key })
        }}
      />
    </Sider>
  )
}
