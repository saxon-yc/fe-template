import { useEffect, useState } from 'react'
import { Dropdown, Menu, Button, Tooltip } from 'antd'
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'

import { useAccountStore } from '@/stores/useAccountStore'
import { usePageSettingStore } from '@/stores/usePageSettingStore'
import SvgIcon from '@/components/svg-icon'

interface HeaderActionsProps {
  className?: string
}

export default function HeaderActions({ className }: HeaderActionsProps) {
  const navigate = useNavigate()
  const { logout, isLogged } = useAccountStore()
  const { themeMode, toggleTheme } = usePageSettingStore()
  const [isFullscreen, setIsFullscreen] = useState(false)

  // 退出登录
  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  // 全屏切换
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  // 用户菜单
  const userMenu = (
    <Menu>
      <Menu.Item key='profile' icon={<UserOutlined />}>
        个人中心
      </Menu.Item>
      <Menu.Item key='settings' icon={<SettingOutlined />}>
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='logout' icon={<LogoutOutlined />} onClick={handleLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  )
  return (
    <div className={`flex items-center gap-3 ${className || ''}`}>
      {/* 主题色选择 */}
      {/* <Tooltip title="切换主题色">
        <ColorPicker
          value={theme}
          onChange={color => setTheme(color.toHexString())}
          size="small"
          showText={false}
        />
      </Tooltip> */}

      {/* 全屏切换 */}
      <Tooltip title={isFullscreen ? '退出全屏' : '全屏'}>
        <Button
          className='!w-[42px]'
          type='text'
          styles={{
            icon: {
              fontSize: '20px',
            },
          }}
          icon={
            isFullscreen ? (
              <SvgIcon
                icon='gridicons:fullscreen-exit'
                className='text-[20px]'
              />
            ) : (
              <SvgIcon icon='gridicons:fullscreen' className='text-[20px]' />
            )
          }
          onClick={toggleFullscreen}
        />
      </Tooltip>

      {/* 主题切换 */}
      <Tooltip title='主题模式'>
        <Button
          type='text'
          className='!w-[42px]'
          styles={{
            icon: {
              fontSize: '20px',
            },
          }}
          icon={
            themeMode === 'dark' ? (
              <SvgIcon
                icon='mdi:moon-waning-crescent'
                className='text-[20px]'
              />
            ) : (
              <SvgIcon icon='mdi:white-balance-sunny' className='text-[20px]' />
            )
          }
          onClick={toggleTheme}
        />
      </Tooltip>

      {/* 用户信息 */}
      {isLogged && (
        <Dropdown
          overlay={userMenu}
          trigger={['click']}
          placement='bottomRight'
        >
          <Button type='text'>
            <SvgIcon icon='mdi:user-circle-outline' className='text-[20px]' />
            管理员
          </Button>
        </Dropdown>
      )}
    </div>
  )
}
