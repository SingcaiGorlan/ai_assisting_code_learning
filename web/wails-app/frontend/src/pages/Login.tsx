import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '@/services/wails-auth'
import { Button, Card, Text, Heading, Flex, Box } from '@radix-ui/themes'

export default function Login() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        // 登录
        const result = await authAPI.login({
          email: formData.email,
          password: formData.password,
        })

        if (result.success) {
          localStorage.setItem('token', result.token || '')
          localStorage.setItem('user', JSON.stringify(result.user))
          navigate('/dashboard')
        } else {
          setError(result.message)
        }
      } else {
        // 注册
        const result = await authAPI.register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })

        if (result.success) {
          setIsLogin(true)
          setError('注册成功！请登录')
        } else {
          setError(result.message)
        }
      }
    } catch (err) {
      setError('操作失败，请重试')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex align="center" justify="center" style={{ minHeight: '100vh', background: 'var(--gray-2)' }}>
      <Card size="3" style={{ width: '400px', maxWidth: '90%' }}>
        <Flex direction="column" gap="4">
          <Heading size="6" align="center">
            {isLogin ? '登录' : '注册'}
          </Heading>

          {error && (
            <Box>
              <Text color="red" size="2">{error}</Text>
            </Box>
          )}

          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="3">
              {!isLogin && (
                <input
                  className="rt-TextFieldInput"
                  placeholder="用户名"
                  value={formData.username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, username: e.target.value })}
                  required={!isLogin}
                  style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--gray-6)', background: 'var(--color-background)' }}
                />
              )}

              <input
                className="rt-TextFieldInput"
                type="email"
                placeholder="邮箱"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--gray-6)', background: 'var(--color-background)' }}
              />

              <input
                className="rt-TextFieldInput"
                type="password"
                placeholder="密码"
                value={formData.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                required
                style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--gray-6)', background: 'var(--color-background)' }}
              />

              <Button type="submit" variant="solid" disabled={loading}>
                {loading ? '处理中...' : (isLogin ? '登录' : '注册')}
              </Button>
            </Flex>
          </form>

          <Flex justify="center">
            <Button
              variant="ghost"
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
                setFormData({ username: '', email: '', password: '' })
              }}
            >
              {isLogin ? '没有账号？注册' : '已有账号？登录'}
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  )
}
