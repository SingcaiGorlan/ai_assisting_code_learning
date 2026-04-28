import { useState } from 'react'
import { Button, Form, Input, Card, Typography, Alert, Divider } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons'
import type { FormProps } from 'antd'

interface LoginProps {
  onLogin: (user: any) => void
}

type FieldType = {
  username?: string
  email?: string
  password?: string
}

export default function Login({ onLogin }: LoginProps) {
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form] = Form.useForm<FieldType>()

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setLoading(true)
    setError('')

    try {
      if (isRegister) {
        const result = await window.go.main.App.Register(
          values.username!,
          values.email!,
          values.password!
        )
        
        if (result.success) {
          setIsRegister(false)
          setError('注册成功！请登录')
          form.resetFields()
        } else {
          setError(result.message || '注册失败')
        }
      } else {
        const result = await window.go.main.App.Login(
          values.username!,
          values.password!
        )
        
        if (result.success) {
          localStorage.setItem('token', result.token)
          onLogin(result.user)
        } else {
          setError(result.message || '登录失败')
        }
      }
    } catch (err) {
      setError('操作失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsRegister(!isRegister)
    setError('')
    form.resetFields()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-4 mx-4">
        <Card 
          className="shadow-2xl"
          styles={{
            body: {
              padding: '32px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)'
            }
          }}
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
              <UserOutlined className="text-white text-xl" />
            </div>
            <Typography.Title level={2} style={{ marginBottom: '8px', color: '#1f2937' }}>
              AI 辅助代码学习
            </Typography.Title>
            <Typography.Text type="secondary">
              {isRegister ? '创建新账号' : '欢迎回来'}
            </Typography.Text>
          </div>

          <Form
            form={form}
            name="login-form"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item<FieldType>
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入用户名"
                size="large"
              />
            </Form.Item>

            {isRegister && (
              <Form.Item<FieldType>
                name="email"
                rules={[
                  { required: true, message: '请输入邮箱!' },
                  { type: 'email', message: '请输入有效的邮箱地址!' }
                ]}
              >
                <Input 
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="请输入邮箱"
                  size="large"
                />
              </Form.Item>
            )}

            <Form.Item<FieldType>
              name="password"
              rules={[
                { required: true, message: '请输入密码!' },
                { min: 6, message: '密码至少需要6个字符!' }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="请输入密码"
                size="large"
              />
            </Form.Item>

            {error && (
              <Alert
                message={error}
                type={error.includes('成功') ? 'success' : 'error'}
                showIcon
                closable
                onClose={() => setError('')}
                style={{ marginBottom: '16px' }}
              />
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                block
                style={{ 
                  background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                  border: 'none',
                  height: '48px'
                }}
              >
                {loading ? <LoadingOutlined /> : isRegister ? '注册' : '登录'}
              </Button>
            </Form.Item>
          </Form>

          <Divider />

          <div className="text-center">
            <Button 
              type="link" 
              onClick={toggleMode}
              style={{ 
                color: '#8b5cf6',
                fontWeight: 500,
                fontSize: '14px'
              }}
            >
              {isRegister ? '已有账号？立即登录' : '没有账号？立即注册'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
