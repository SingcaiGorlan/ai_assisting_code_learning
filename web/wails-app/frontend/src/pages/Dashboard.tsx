import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { lessonsAPI } from '@/services/wails-lessons'
import type { Lesson } from '@/services/wails-lessons'
import { Card, Heading, Text, Flex, Box, Button, Progress } from '@radix-ui/themes'

export default function Dashboard() {
  const navigate = useNavigate()
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLessons()
  }, [])

  const loadLessons = async () => {
    try {
      const data = await lessonsAPI.getList()
      setLessons(data)
    } catch (error) {
      console.error('Failed to load lessons:', error)
    } finally {
      setLoading(false)
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'green'
      case 'intermediate':
        return 'blue'
      case 'advanced':
        return 'red'
      default:
        return 'gray'
    }
  }

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner':
        return '初级'
      case 'intermediate':
        return '中级'
      case 'advanced':
        return '高级'
      default:
        return level
    }
  }

  if (loading) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '400px' }}>
        <Text>加载中...</Text>
      </Flex>
    )
  }

  return (
    <Box style={{ padding: '24px' }}>
      <Heading size="8" mb="4">欢迎回来！</Heading>
      <Text size="4" color="gray" mb="6">继续你的学习之旅</Text>

      <Heading size="6" mb="4">我的课程</Heading>
      
      <Flex direction="column" gap="3">
        {lessons.map((lesson) => (
          <Card key={lesson.id} size="3">
            <Flex justify="between" align="start">
              <Box style={{ flex: 1 }}>
                <Flex align="center" gap="2" mb="2">
                  <Heading size="4">{lesson.title}</Heading>
                  <Text size="2" color={getLevelColor(lesson.level)}>
                    {getLevelText(lesson.level)}
                  </Text>
                </Flex>
                <Text size="2" color="gray" mb="3">
                  {lesson.description}
                </Text>
                <Flex align="center" gap="2">
                  <Progress value={lesson.progress || 0} size="2" style={{ flex: 1 }} />
                  <Text size="2" color="gray">{lesson.progress || 0}%</Text>
                </Flex>
              </Box>
              <Button
                variant="solid"
                ml="4"
                onClick={() => navigate(`/lessons`)}
              >
                继续学习
              </Button>
            </Flex>
          </Card>
        ))}
      </Flex>

      <Flex gap="3" mt="6">
        <Button variant="solid" onClick={() => navigate('/lessons')}>
          浏览所有课程
        </Button>
        <Button variant="soft" onClick={() => navigate('/chat')}>
          AI 助手
        </Button>
      </Flex>
    </Box>
  )
}
