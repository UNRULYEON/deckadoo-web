import { ReactNode, createContext, useState } from 'react'
import { createDeckadooStore, DeckadooState, DeckadooStore } from '@/state'

export const DeckadooStoreContext = createContext<DeckadooStore | null>(null)

type DeckadooStoreProps = {
  initialState?: DeckadooState
  children: ReactNode
}

export const DeckadooStoreProvider = ({
  initialState,
  children,
}: DeckadooStoreProps) => {
  const [store] = useState(() => createDeckadooStore(initialState))

  return (
    <DeckadooStoreContext.Provider value={store}>
      {children}
    </DeckadooStoreContext.Provider>
  )
}
