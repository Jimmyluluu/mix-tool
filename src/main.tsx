import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './lib/pages/Home'
import FoodPicker from './lib/pages/FoodPicker'
import WheelPicker from './lib/pages/WheelPicker'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food-picker" element={<FoodPicker />} />
        <Route path="/wheel-picker" element={<WheelPicker />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
