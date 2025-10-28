import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19'
import { setupNProgress, setupDayjs } from '@/plugins'

import App from './App'

function setupApp() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )

  setupNProgress()

  setupDayjs()
}

setupApp()
