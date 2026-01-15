import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface HistoryRecord {
  id: string
  name: string
  timestamp: number
}

function WheelPicker() {
  const navigate = useNavigate()
  const [participants, setParticipants] = useState<string[]>([])
  const [newName, setNewName] = useState('')
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedWinner, setSelectedWinner] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const [history, setHistory] = useState<HistoryRecord[]>([])
  const wheelRef = useRef<HTMLDivElement>(null)

  // 從 localStorage 載入資料
  useEffect(() => {
    const savedParticipants = localStorage.getItem('wheelParticipants')
    const savedHistory = localStorage.getItem('wheelHistory')
    
    if (savedParticipants) {
      setParticipants(JSON.parse(savedParticipants))
    }
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  // 儲存參與者到 localStorage
  useEffect(() => {
    if (participants.length > 0) {
      localStorage.setItem('wheelParticipants', JSON.stringify(participants))
    }
  }, [participants])

  // 儲存歷史記錄到 localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('wheelHistory', JSON.stringify(history))
    }
  }, [history])

  // 新增參與者
  const addParticipant = () => {
    if (newName.trim() && !participants.includes(newName.trim())) {
      setParticipants([...participants, newName.trim()])
      setNewName('')
    }
  }

  // 刪除參與者
  const removeParticipant = (name: string) => {
    setParticipants(participants.filter(p => p !== name))
  }

  // 轉動輪盤
  const spinWheel = () => {
    if (participants.length === 0 || isSpinning) return

    setIsSpinning(true)
    setSelectedWinner(null)

    // 計算旋轉角度 - 隨機旋轉
    const spins = 5 + Math.random() * 3 // 至少轉5圈
    const extraRotation = Math.random() * 360 // 額外隨機角度
    const totalRotation = 360 * spins + extraRotation
    
    setRotation(rotation + totalRotation)
    
    // 計算旋轉後頂部指針(0度)指向的是哪個扇形
    const finalAngle = (rotation + totalRotation) % 360
    const anglePerPerson = 360 / participants.length
    
    // 輪盤旋轉後,頂部指針相對於輪盤的角度
    // 因為輪盤順時針旋轉了 finalAngle,所以指針相對於輪盤是逆時針 finalAngle
    const pointerAngleOnWheel = (360 - finalAngle) % 360
    
    // 計算這個角度落在哪個扇形內
    // 第 i 個扇形佔據 [i * anglePerPerson, (i+1) * anglePerPerson)
    const winnerIndex = Math.floor(pointerAngleOnWheel / anglePerPerson) % participants.length
    const winner = participants[winnerIndex]
    
    console.log('Final Rotation:', finalAngle.toFixed(2), 'Pointer on Wheel:', pointerAngleOnWheel.toFixed(2), 'Angle per person:', anglePerPerson.toFixed(2), 'Winner Index:', winnerIndex, 'Winner:', winner)

    // 3秒後顯示結果
    setTimeout(() => {
      setIsSpinning(false)
      setSelectedWinner(winner)
      
      // 新增到歷史記錄
      const newRecord: HistoryRecord = {
        id: Date.now().toString(),
        name: winner,
        timestamp: Date.now(),
      }
      setHistory([newRecord, ...history.slice(0, 9)]) // 只保留最近10筆
    }, 3000)
  }

  // 清除歷史記錄
  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('wheelHistory')
  }

  // 格式化時間
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString('zh-TW', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
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
          <h1 className="text-4xl font-bold mb-2">抽人輪盤</h1>
          <p className="text-muted-foreground">隨機抽選幸運兒的輪盤工具</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左側:名單管理 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 新增參與者 */}
            <Card>
              <CardHeader>
                <CardTitle>參與者名單</CardTitle>
                <CardDescription>
                  目前有 {participants.length} 位參與者
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="輸入姓名..."
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
                  />
                  <Button onClick={addParticipant}>新增</Button>
                </div>

                {/* 參與者列表 */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {participants.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      尚無參與者,請先新增
                    </p>
                  ) : (
                    participants.map((name) => (
                      <div
                        key={name}
                        className="flex items-center justify-between p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <span>{name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeParticipant(name)}
                          className="h-8 w-8 p-0"
                        >
                          ✕
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 歷史記錄 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>抽選記錄</CardTitle>
                    <CardDescription>最近的抽選結果</CardDescription>
                  </div>
                  {history.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearHistory}
                    >
                      清除
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {history.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      尚無抽選記錄
                    </p>
                  ) : (
                    history.map((record) => (
                      <div
                        key={record.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-secondary/30"
                      >
                        <span className="font-medium">{record.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(record.timestamp)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右側:轉盤 */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>轉動輪盤</CardTitle>
                <CardDescription>
                  點擊按鈕開始抽選
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 轉盤視覺化 */}
                <div className="relative aspect-square max-w-xl mx-auto">
                  {/* 頂部指針 */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-0 h-0 border-l-20 border-r-20 border-b-40 border-l-transparent border-r-transparent border-b-primary"></div>
                  </div>

                  <div
                    ref={wheelRef}
                    className="w-full h-full rounded-full border-8 border-primary relative overflow-hidden transition-transform duration-3000 ease-out"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      background: participants.length > 0
                        ? `conic-gradient(${participants
                            .map((_, i) => {
                              const anglePerPerson = 360 / participants.length
                              const startAngle = i * anglePerPerson
                              const endAngle = (i + 1) * anglePerPerson
                              // 使用 HSL 動態生成顏色
                              // 色相平均分配,飽和度70%,亮度根據 dark mode 調整
                              const hue = (i * 360 / participants.length) % 360
                              // dark mode 使用較暗的顏色,light mode 使用較亮的顏色
                              const lightness = document.documentElement.classList.contains('dark') ? 50 : 60
                              const color = `hsl(${hue}, 70%, ${lightness}%)`
                              return `${color} ${startAngle}deg ${endAngle}deg`
                            })
                            .join(', ')})`
                        : 'hsl(var(--muted))',
                    }}
                  >
                    {/* 參與者名字 */}
                    {participants.map((name, i) => {
                      const anglePerPerson = 360 / participants.length
                      // 扇形中心角度
                      const centerAngle = i * anglePerPerson + anglePerPerson / 2
                      
                      // 轉換為弧度,注意 conic-gradient 預設從右邊(3點鐘)開始
                      // 所以 0度=右邊, 90度=下, 180度=左, 270度=上
                      // 我們要的: 0度=上, 90度=右, 180度=下, 270度=左
                      // 所以要減90度
                      const adjustedAngle = centerAngle - 90
                      const radian = adjustedAngle * (Math.PI / 180)
                      const radius = 40
                      
                      const x = 50 + radius * Math.cos(radian)
                      const y = 50 + radius * Math.sin(radian)
                      
                      return (
                        <div
                          key={`${name}-${i}`}
                          className="absolute font-bold text-sm md:text-base whitespace-nowrap"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: 'translate(-50%, -50%)',
                            color: 'white',
                            textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.8)',
                          }}
                        >
                          {name}
                        </div>
                      )
                    })}

                    {/* 中心圓 */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-background border-4 border-primary shadow-lg"></div>
                  </div>
                </div>

                {/* 抽選按鈕 */}
                <div className="text-center space-y-4">
                  <Button
                    size="lg"
                    onClick={spinWheel}
                    disabled={participants.length === 0 || isSpinning}
                    className="w-full max-w-xs text-lg h-14"
                  >
                    {isSpinning ? '抽選中...' : '開始抽選'}
                  </Button>

                  {participants.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      請先新增參與者
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 結果對話框 */}
      <Dialog open={selectedWinner !== null} onOpenChange={() => setSelectedWinner(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">🎉 抽選結果</DialogTitle>
            <DialogDescription className="text-center">
              恭喜中選!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Badge className="text-3xl px-6 py-3">{selectedWinner}</Badge>
          </div>
          <Button onClick={() => setSelectedWinner(null)} className="w-full">
            關閉
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default WheelPicker
