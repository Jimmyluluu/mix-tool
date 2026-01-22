import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface HomeProps {
  isDark: boolean
  setIsDark: (isDark: boolean) => void
}

function Home({ isDark, setIsDark }: HomeProps) {
  const navigate = useNavigate()

  const tools = [
    {
      id: 'food-picker',
      title: '吃飯選擇器',
      description: '不知道吃什麼？讓我幫你決定！',
      path: '/food-picker',
      emoji: '',
    },
    {
      id: 'wheel-picker',
      title: '抽人輪盤',
      description: '隨機抽選幸運兒的輪盤工具',
      path: '/wheel-picker',
      emoji: '',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        {/* 標題區 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">小工具箱</h1>
            <p className="text-muted-foreground">實用的日常小工具集合</p>
          </div>
          <Button onClick={() => setIsDark(!isDark)} variant="outline">
            {isDark ? '🌞 淺色模式' : '🌙 深色模式'}
          </Button>
        </div>

        {/* 工具卡片網格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Card
              key={tool.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(tool.path)}
            >
              <CardHeader>
                <div className="text-6xl mb-4">{tool.emoji}</div>
                <CardTitle className="text-2xl">{tool.title}</CardTitle>
                <CardDescription className="text-base">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">開始使用</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
