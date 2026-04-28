import { useState, useEffect } from 'react'
import { Card, Typography, Progress, Button, Row, Col, Spin, Empty } from 'antd'
import { BookOutlined, PlayCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export default function Lessons() {
  const [lessons, setLessons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLessons()
  }, [])

  const loadLessons = async () => {
    try {
      const data = await window.go.main.App.GetLessons()
      setLessons(data)
    } catch (error) {
      console.error('加载课程失败:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <Spin size="large" tip="加载中..." />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Title level={2} style={{ marginBottom: '8px', color: '#1f2937' }}>
            我的课程
          </Title>
          <Text type="secondary">选择要学习的课程</Text>
        </div>

        {lessons.length === 0 ? (
          <Empty 
            description="暂无课程"
            style={{ marginTop: '48px' }}
          />
        ) : (
          <Row gutter={[24, 24]}>
            {lessons.map((lesson) => (
              <Col xs={24} sm={12} lg={8} key={lesson.id}>
                <Card
                  hoverable
                  style={{ 
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <div 
                      style={{ 
                        width: '48px', 
                        height: '48px', 
                        background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px'
                      }}
                    >
                      <BookOutlined style={{ color: 'white', fontSize: '24px' }} />
                    </div>
                    
                    <Title level={4} style={{ margin: '0 0 8px', color: '#1f2937' }}>
                      {lesson.title}
                    </Title>
                    <Text type="secondary" style={{ fontSize: '14px' }}>
                      {lesson.description}
                    </Text>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        学习进度
                      </Text>
                      <Text strong style={{ color: '#8b5cf6', fontSize: '14px' }}>
                        {lesson.progress}%
                      </Text>
                    </div>
                    
                    <Progress 
                      percent={lesson.progress} 
                      showInfo={false}
                      strokeColor={{ 
                        '0%': '#3b82f6',
                        '100%': '#8b5cf6'
                      }}
                    />
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginTop: '8px',
                      fontSize: '12px',
                      color: '#8c8c8c'
                    }}>
                      <span>已完成 {lesson.completed} / {lesson.total} 节</span>
                      {lesson.progress > 0 && (
                        <CheckCircleOutlined style={{ color: '#52c41a' }} />
                      )}
                    </div>
                  </div>

                  <Button
                    type="primary"
                    block
                    icon={<PlayCircleOutlined />}
                    style={{ 
                      background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                      border: 'none',
                      height: '40px'
                    }}
                  >
                    {lesson.progress > 0 ? '继续学习' : '开始学习'}
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  )
}