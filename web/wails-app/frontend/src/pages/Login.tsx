import { useState } from 'react'
import { UserOutlined, MailOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons'
import type { FormProps } from 'antd'
import { Button, Form, Input, Alert, Divider } from 'antd'

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
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e]">
      <div className="w-full max-w-md p-4 mx-4">
        {/* VS Code 风格卡片 */}
        <div className="bg-[#252526] border border-[#3c3c3c] rounded-md shadow-xl">
          {/* 标题区域 */}
          <div className="px-8 pt-8 pb-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#007acc] rounded-md mb-4">
              <UserOutlined className="text-white text-2xl" />
            </div>
            <h1 className="text-[26px] font-semibold text-white mb-2">
              AI 辅助代码学习
            </h1>
            <p className="text-[13px] text-gray-400">
              {isRegister ? '创建新账号' : '欢迎回来'}
            </p>
          </div>

          <Divider style={{ borderColor: '#3c3c3c', margin: '0' }} />

          {/* 表单区域 */}
          <div className="px-8 py-6">
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
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="请输入用户名"
                  size="large"
                  className="bg-[#3c3c3c] border-[#555555] text-white placeholder:text-gray-500 hover:border-[#007acc] focus:border-[#007acc] focus:shadow-[0_0_0_2px_rgba(0,122,204,0.2)]"
                  styles={{
                    input: {
                      color: '#ffffff',
                      backgroundColor: 'transparent'
                    }
                  }}
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
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="请输入邮箱"
                    size="large"
                    className="bg-[#3c3c3c] border-[#555555] text-white placeholder:text-gray-500 hover:border-[#007acc] focus:border-[#007acc] focus:shadow-[0_0_0_2px_rgba(0,122,204,0.2)]"
                    styles={{
                      input: {
                        color: '#ffffff',
                        backgroundColor: 'transparent'
                      }
                    }}
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
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="请输入密码"
                  size="large"
                  className="bg-[#3c3c3c] border-[#555555] text-white placeholder:text-gray-500 hover:border-[#007acc] focus:border-[#007acc] focus:shadow-[0_0_0_2px_rgba(0,122,204,0.2)]"
                  styles={{
                    input: {
                      color: '#ffffff',
                      backgroundColor: 'transparent'
                    }
                  }}
                />
              </Form.Item>

              {error && (
                <Alert
                  message={error}
                  type={error.includes('成功') ? 'success' : 'error'}
                  showIcon
                  closable
                  onClose={() => setError('')}
                  style={{ marginBottom: '16px', backgroundColor: '#252526', border: '#3c3c3c' }}
                />
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  block
                  className="h-[40px] bg-[#007acc] hover:bg-[#1177bb] border-none text-white font-medium rounded-sm"
                >
                  {loading ? <LoadingOutlined /> : isRegister ? '注册' : '登录'}
                </Button>
              </Form.Item>
            </Form>

            <Divider style={{ borderColor: '#3c3c3c' }} />

            <div className="text-center">
              <button 
                onClick={toggleMode}
                className="text-[#007acc] hover:underline text-[13px] bg-transparent border-none cursor-pointer"
              >
                {isRegister ? '已有账号？立即登录' : '没有账号？立即注册'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
