import { StrictMode, use } from 'react'
import { createRoot } from 'react-dom/client'
import useLoadMaps from './hooks/useLoadMaps.js';
import './index.css'
import App from './App.jsx'

useLoadMaps(import.meta.env.VITE_GOOGLE_PLACES_API_KEY);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
