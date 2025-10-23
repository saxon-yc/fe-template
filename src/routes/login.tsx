import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Typography,
  Checkbox,
  Divider,
} from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useEffect } from 'react'

import { useAccountStore } from '@/stores/useAccountStore'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAccountStore()
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ username: 'admin', password: '123456' })
  }, [form])

  const handleLogin = async (values: {
    username: string
    password: string
    remember?: boolean
  }) => {
    console.log('Received values of form: ', values)
    // 模拟登录API调用
    if (values.username === 'admin' && values.password === '123456') {
      // 登录成功，设置用户状态
      login(['home', 'about'])
      message.success('登录成功！')
      // 重定向到管理后台首页
      navigate({ to: '/' })
    } else {
      message.error('用户名或密码错误！')
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <Card className='shadow-lg border-0 rounded-lg overflow-hidden'>
          {/* 头部区域 */}
          <div className='text-center'>
            <Typography.Title level={2} className='!mb-2'>
              前端框架模板
            </Typography.Title>
            <Typography.Text type='secondary' className='text-sm'>
              请输入用户名和密码
            </Typography.Text>
          </div>

          {/* 登录表单区域 */}
          <div className='px-8 py-6'>
            <Form
              form={form}
              onFinish={handleLogin}
              layout='vertical'
              size='large'
              className='space-y-4'
            >
              <Form.Item
                name='username'
                rules={[{ required: true, message: '请输入邮箱/手机号' }]}
              >
                <Input
                  prefix={<MailOutlined className='text-gray-400' />}
                  placeholder='请输入邮箱/手机号'
                  className='h-12 rounded-lg'
                />
              </Form.Item>

              <Form.Item
                name='password'
                rules={[{ required: true, message: '请输入密码' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className='text-gray-400' />}
                  placeholder='请输入密码'
                  className='h-12 rounded-lg'
                />
              </Form.Item>

              <Form.Item
                name='remember'
                valuePropName='checked'
                className='mb-6'
              >
                <div className='flex items-center justify-between'>
                  <Checkbox>记住我</Checkbox>
                  <Typography.Link>忘记密码？</Typography.Link>
                </div>
              </Form.Item>

              <Form.Item className='mb-4'>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='w-full h-12 rounded-lg bg-gradient-to-r'
                  size='large'
                >
                  登录
                </Button>
              </Form.Item>

              <Divider className='my-6'>
                <Typography.Text type='secondary' className='text-sm'>
                  或
                </Typography.Text>
              </Divider>

              <div className='text-center'>
                <Typography.Text type='secondary' className='text-sm'>
                  还没有账号？
                  <Typography.Link className='ml-1'>立即注册</Typography.Link>
                </Typography.Text>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const { isLogged } = useAccountStore.getState()
    if (isLogged) {
      throw redirect({ to: '/' })
    }
  },
  component: LoginPage,
})
