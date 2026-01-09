import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function WheelPicker() {
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
          <h1 className="text-4xl font-bold mb-2">🎯 抽人輪盤</h1>
          <p className="text-muted-foreground">隨機抽選幸運兒的輪盤工具</p>
        </div>

        {/* 功能區域 */}
        <Card>
          <CardHeader>
            <CardTitle>轉動輪盤</CardTitle>
            <CardDescription>
              功能開發中...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <p>抽人輪盤功能即將推出 🚀</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default WheelPicker
