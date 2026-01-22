import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function FoodPicker() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        {/* 返回按鈕 */}
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          ← 返回首頁
        </Button>

        {/* 頁面標題 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🍜 吃飯選擇器</h1>
          <p className="text-muted-foreground">不知道吃什麼？讓我幫你決定！</p>
        </div>

        {/* 功能區域 */}
        <Card>
          <CardHeader>
            <CardTitle>選擇你的餐點</CardTitle>
            <CardDescription>
              功能開發中...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <p>吃飯選擇器功能即將推出 🚀</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FoodPicker
