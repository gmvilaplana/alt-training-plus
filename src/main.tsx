import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BaseProvider } from '@telus-uds/components-web'
import alliumTheme from '@telus-uds/theme-allium'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BaseProvider defaultTheme={alliumTheme}>
      <App />
    </BaseProvider>
  </StrictMode>,
)
