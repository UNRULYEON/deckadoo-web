// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DeckadooStoreProvider } from './context/DeckadooStoreProvider/DeckadooStoreProvider.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <DeckadooStoreProvider>
    <App />
  </DeckadooStoreProvider>
  // </StrictMode>
)
