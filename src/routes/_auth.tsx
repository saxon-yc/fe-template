import {
  HomeOutlined,
  UserOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons'
import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import {
  Layout,
  Menu,
  Button,
  ColorPicker,
  Switch,
  Tooltip,
  Avatar,
  FloatButton,
} from 'antd'

import logo from 'assets/images/logo.jpg'
import { useAccountStore } from '@/store/useAccountStore'
import { usePageSettingStore } from '@/store/usePageSettingStore'

const { Header, Content, Sider, Footer } = Layout

const menus = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '关于',
    key: '/about',
    icon: <UserOutlined />,
  },
]

function AuthLayout() {
  const navigate = useNavigate()
  const { logout, isLogged } = useAccountStore()
  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  const location = useLocation()
  const { setTheme, theme, themeMode, toggleTheme } = usePageSettingStore()

  return (
    <Layout>
      <Header
        className={`flex justify-between items-center !px-[20px] ${themeMode === 'dark' ? '!bg-[#141414]' : '!bg-[#fff]'}`}
      >
        <Avatar src={logo} size={40} />
        <div className='flex items-center gap-[10px]'>
          <Tooltip title={themeMode === 'light' ? '深色模式' : '浅色模式'}>
            <Switch
              checked={themeMode === 'dark'}
              onChange={toggleTheme}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
            />
          </Tooltip>
          <Tooltip title='切换主题'>
            <ColorPicker
              value={theme}
              onChange={color => setTheme(color.toHexString())}
            />
          </Tooltip>
          {isLogged && <Button onClick={handleLogout}>退出登录</Button>}
        </div>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode='inline'
            defaultSelectedKeys={[location.pathname]}
            style={{
              height: '100%',
              background: themeMode === 'dark' ? '#141414' : '#fff',
            }}
            items={menus}
            onSelect={({ key }) => {
              navigate({ to: key })
            }}
          />
        </Sider>
        <Content
          id='CONTENT_CONTAINER_ID'
          className='p-[20px] h-[calc(100vh-64px)] overflow-y-auto'
        >
          <Outlet />
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
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

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    if (!context.isLogged) {
      throw redirect({ to: '/login' })
    }
  },
  component: AuthLayout,
})
