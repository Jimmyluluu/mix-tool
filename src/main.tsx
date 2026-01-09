import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './lib/pages/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
