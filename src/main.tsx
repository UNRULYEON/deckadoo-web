// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DeckadooStoreProvider } from './context/DeckadooStoreProvider/DeckadooStoreProvider.tsx'
import { routeTree } from './routeTree.gen'
import './index.css'
import { createRouter, RouterProvider } from '@tanstack/react-router'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <DeckadooStoreProvider>
    <RouterProvider router={router} />
  </DeckadooStoreProvider>
  // </StrictMode>
)
