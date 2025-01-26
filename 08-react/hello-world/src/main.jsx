import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // PARA RENDERIZAR VARIAS COSAS, COMO TIENEN QUE ESTAR DEBAJO DE UN UNICO ELEMENTO, NECESITAMOS HACER UN CONTENEDOR HTML VACÍO
  <>
  <StrictMode>
    <App />
  </StrictMode>,
  </>
)
