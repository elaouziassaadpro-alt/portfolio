import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'

const app = (
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <LazyMotion features={domAnimation} strict>
          <MotionConfig reducedMotion="user">
            <App />
          </MotionConfig>
        </LazyMotion>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
)

// Production pages are pre-rendered; in dev the root only holds a placeholder comment.
const root = document.getElementById('root')
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
