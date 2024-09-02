import { DeckadooStoreContext } from '@/context'
import { DeckadooState } from '@/state'
import { useContext } from 'react'
import { useStore } from 'zustand'

export const useDeckadooStore = <T>(selector: (state: DeckadooState) => T) => {
  const store = useContext(DeckadooStoreContext)

  if (!store)
    throw new Error(
      'useDeckadooStore must be used within a DeckadooStoreProvider'
    )

  return useStore(store, selector)
}
