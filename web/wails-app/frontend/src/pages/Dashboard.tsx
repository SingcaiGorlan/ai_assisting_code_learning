import { Card, Statistic, Row, Col, Progress, Typography } from 'antd'
import { BookOutlined, MessageOutlined, RiseOutlined, ClockCircleOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export default function Dashboard() {
  const stats = [
    { icon: <BookOutlined />, label: '学习课程', value: '3', color: '#3b82f6' },
    { icon: <ClockCircleOutlined />, label: '学习时长', value: '24h', color: '#10b981' },
    { icon: <RiseOutlined />, label: '完成进度', value: '45%', color: '#8b5cf6' },
    { icon: <MessageOutlined />, label: 'AI 对话', value: '128', color: '#ec4899' },
  ]

  const recentLessons = [
    { id: 1, title: 'Go 语言基础', progress: 75, lastStudied: '2小时前' },
    { id: 2, title: 'Web 开发实战', progress: 40, lastStudied: '昨天' },
    { id: 3, title: '数据库设计', progress: 0, lastStudied: '未开始' },
  ]

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Title level={2} style={{ marginBottom: '8px', color: '#1f2937' }}>
            欢迎回来！
          </Title>
          <Text type="secondary">继续你的学习之旅</Text>
        </div>

        {/* 统计卡片 */}
        <Row gutter={[24, 24]} className="mb-6">
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card 
                hoverable 
                style={{ 
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s'
                }}
              >
                <Statistic
                  prefix={stat.icon}
                  value={stat.value}
                  title={stat.label}
                  valueStyle={{ 
                    color: stat.color,
                    fontSize: '24px',
                    fontWeight: 'bold'
                  }}
                  style={{ textAlign: 'center' }}
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* 最近学习 */}
        <Card 
          title="最近学习" 
          style={{ 
            borderRadius: '12px',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
          styles={{
            header: { 
              borderBottom: '1px solid #f0f0f0',
              padding: '16px 24px'
            }
          }}
        >
          <div className="space-y-4">
            {recentLessons.map((lesson) => (
              <div 
                key={lesson.id} 
                className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors cursor-pointer"
                style={{ backgroundColor: '#fafafa' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Title level={5} style={{ margin: 0, color: '#1f2937' }}>
                    {lesson.title}
                  </Title>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {lesson.lastStudied}
                  </Text>
                </div>
                <Progress 
                  percent={lesson.progress} 
                  showInfo={false}
                  strokeColor={{ 
                    '0%': '#3b82f6',
                    '100%': '#8b5cf6'
                  }}
                  style={{ marginBottom: '8px' }}
                />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  进度: {lesson.progress}%
                </Text>
              </div>
            ))}
          </div>
        </Card>

        {/* 快捷操作 */}
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card 
              hoverable
              style={{ 
                background: 'linear-gradient(to bottom right, #3b82f6, #2563eb)',
                borderRadius: '12px',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              <div className="flex items-center">
                <BookOutlined style={{ fontSize: '32px', marginRight: '16px' }} />
                <div>
                  <Title level={4} style={{ color: 'white', margin: 0, marginBottom: '4px' }}>
                    继续学习
                  </Title>
                  <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                    从上次离开的地方继续
                  </Text>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card 
              hoverable
              style={{ 
                background: 'linear-gradient(to bottom right, #8b5cf6, #7c3aed)',
                borderRadius: '12px',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              <div className="flex items-center">
                <MessageOutlined style={{ fontSize: '32px', marginRight: '16px' }} />
                <div>
                  <Title level={4} style={{ color: 'white', margin: 0, marginBottom: '4px' }}>
                    AI 助手
                  </Title>
                  <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                    获取智能学习建议
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}