import { useNavigate } from '@tanstack/react-router'
import { Avatar, Typography } from 'antd'
import useToken from 'antd/es/theme/useToken'
import logo from 'assets/img/logo.jpg'

const { Title } = Typography

interface LogoProps {
  collapsed?: boolean
  size?: number
  showText?: boolean
  className?: string
}

export default function Logo({
  collapsed = false,
  size = 36,
  showText = true,
  className = '',
}: LogoProps) {
  const [_, token] = useToken()
  const navigate = useNavigate()
  return (
    <div
      className={`flex items-center justify-center h-[56px] gap-3 ${className} cursor-pointer`}
      onClick={() => {
        navigate({ to: '/' })
      }}
    >
      <Avatar src={logo} size={size} />
      {!collapsed && showText && (
        <Title
          level={2}
          className={`!text-[16px] !m-0`}
          style={{ color: token.colorPrimary }}
        >
          前端模板
        </Title>
      )}
    </div>
  )
}
