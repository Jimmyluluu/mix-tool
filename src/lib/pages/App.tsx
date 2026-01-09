import { useState } from 'react'
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
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function App() {
  const [isDark, setIsDark] = useState(false)
  const [name, setName] = useState('')

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 標題區 */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">shadcn/ui 元件展示</h1>
              <p className="text-muted-foreground">使用 Tailwind CSS v4 + React</p>
            </div>
            <Button onClick={() => setIsDark(!isDark)} variant="outline">
              {isDark ? '🌞 淺色模式' : '🌙 深色模式'}
            </Button>
          </div>

          {/* Badge 展示 */}
          <Card>
            <CardHeader>
              <CardTitle>Badge 徽章</CardTitle>
              <CardDescription>用於標記和分類的小標籤</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2 flex-wrap">
              <Badge>預設</Badge>
              <Badge variant="secondary">次要</Badge>
              <Badge variant="destructive">危險</Badge>
              <Badge variant="outline">外框</Badge>
            </CardContent>
          </Card>

          {/* Button 展示 */}
          <Card>
            <CardHeader>
              <CardTitle>Button 按鈕</CardTitle>
              <CardDescription>各種樣式的按鈕元件</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2 flex-wrap">
              <Button>預設按鈕</Button>
              <Button variant="secondary">次要按鈕</Button>
              <Button variant="destructive">危險按鈕</Button>
              <Button variant="outline">外框按鈕</Button>
              <Button variant="ghost">幽靈按鈕</Button>
              <Button variant="link">連結按鈕</Button>
            </CardContent>
          </Card>

          {/* Input 展示 */}
          <Card>
            <CardHeader>
              <CardTitle>Input 輸入框</CardTitle>
              <CardDescription>文字輸入元件</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input 
                  placeholder="請輸入你的名字" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {name && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    你好，{name}！👋
                  </p>
                )}
              </div>
              <Input type="email" placeholder="電子郵件" />
              <Input type="password" placeholder="密碼" />
            </CardContent>
          </Card>

          {/* Dialog 展示 */}
          <Card>
            <CardHeader>
              <CardTitle>Dialog 對話框</CardTitle>
              <CardDescription>模態對話框元件</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>開啟對話框</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>這是一個對話框</DialogTitle>
                    <DialogDescription>
                      這是對話框的描述文字。你可以在這裡放置任何內容。
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="在對話框中輸入內容" />
                    <Button className="w-full">確認</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Dropdown Menu 展示 */}
          <Card>
            <CardHeader>
              <CardTitle>Dropdown Menu 下拉選單</CardTitle>
              <CardDescription>下拉式選單元件</CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">開啟選單</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>我的帳戶</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>個人資料</DropdownMenuItem>
                  <DropdownMenuItem>設定</DropdownMenuItem>
                  <DropdownMenuItem>團隊</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    登出
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          {/* 組合範例 */}
          <Card>
            <CardHeader>
              <CardTitle>組合範例</CardTitle>
              <CardDescription>多個元件組合使用</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Input placeholder="搜尋..." className="flex-1" />
                <Button>搜尋</Button>
              </div>
              <div className="flex gap-2">
                <Badge>React</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="outline">Tailwind CSS</Badge>
                <Badge>shadcn/ui</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App
