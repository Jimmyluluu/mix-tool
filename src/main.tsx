import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './lib/pages/Home'
import FoodPicker from './lib/pages/FoodPicker'
import WheelPicker from './lib/pages/WheelPicker'

function App() {
  // 初始化時從 localStorage 讀取，如果沒有則使用系統設定
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      return saved === 'dark'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // 監聽系統深色模式變化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      // 只有在沒有手動設定過主題時才自動跟隨系統
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // 當 isDark 改變時，更新 localStorage 和 document
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home isDark={isDark} setIsDark={setIsDark} />} />
        <Route path="/food-picker" element={<FoodPicker />} />
        <Route path="/wheel-picker" element={<WheelPicker />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
