import { HomeOutlined, BookOutlined, MessageOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Menu, Layout, Avatar, Dropdown, Space, Typography } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import type { MenuProps } from 'antd'

const { Header } = Layout
const { Text } = Typography

interface NavbarProps {
  user: any
  onLogout: () => void
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const location = useLocation()

  const navItems: MenuProps['items'] = [
    { 
      key: '/dashboard', 
      icon: <HomeOutlined />, 
      label: <Link to="/dashboard">首页</Link>,
      className: location.pathname === '/dashboard' ? 'ant-menu-item-selected' : ''
    },
    { 
      key: '/lessons', 
      icon: <BookOutlined />, 
      label: <Link to="/lessons">课程</Link>,
      className: location.pathname === '/lessons' ? 'ant-menu-item-selected' : ''
    },
    { 
      key: '/chat', 
      icon: <MessageOutlined />, 
      label: <Link to="/chat">AI 助手</Link>,
      className: location.pathname === '/chat' ? 'ant-menu-item-selected' : ''
    },
  ]

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: onLogout
    }
  ]

  return (
    <Header 
      style={{ 
        background: '#fff', 
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>AI</Text>
          </div>
          <Text style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>
            AI 辅助代码学习平台
          </Text>
        </div>

        <Menu
          mode="horizontal"
          items={navItems}
          style={{ 
            border: 'none',
            background: 'transparent'
          }}
          selectedKeys={[location.pathname]}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Space style={{ cursor: 'pointer' }}>
            <Avatar 
              size="large" 
              icon={<UserOutlined />} 
              style={{ backgroundColor: '#3b82f6' }}
            />
            <Text style={{ fontSize: '14px', fontWeight: 500 }}>
              {user?.username || '用户'}
            </Text>
          </Space>
        </Dropdown>
      </div>
    </Header>
  )
}