import { createFileRoute } from '@tanstack/react-router'
import { Button, Card, Typography, Space } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

import { useAppStore } from 'store/useAppStore'

const { Title, Text } = Typography

function HomePage() {
  const { count, increment, decrement, user, setUser, clearUser } =
    useAppStore()

  const handleSetUser = () => {
    setUser({
      name: '张三',
      email: 'zhangsan@example.com',
    })
  }

  return (
    <>
      <Card className='max-w-4xl mx-auto'>
        <Title level={2} className='mb-6 font-bold !mt-0'>
          React 前端框架模板
        </Title>

        <div className='flex flex-col gap-4'>
          <Card title='状态管理示例'>
            <Space direction='vertical' align='start'>
              <Text>当前计数: {count}</Text>
              <Space>
                <Button
                  icon={<PlusOutlined />}
                  onClick={increment}
                  type='primary'
                >
                  增加
                </Button>
                <Button icon={<MinusOutlined />} onClick={decrement}>
                  减少
                </Button>
              </Space>
            </Space>
          </Card>

          <Card title='用户信息'>
            <Space direction='vertical' align='start'>
              {user ? (
                <>
                  <Text>姓名: {user.name}</Text>
                  <Text>邮箱: {user.email}</Text>
                  <Button onClick={clearUser} danger>
                    清除用户
                  </Button>
                </>
              ) : (
                <>
                  <Text>暂无用户信息</Text>
                  <Button onClick={handleSetUser} type='primary' className=''>
                    设置用户
                  </Button>
                </>
              )}
            </Space>
          </Card>
        </div>
      </Card>
    </>
  )
}

export const Route = createFileRoute('/_auth/')({
  component: HomePage,
})
