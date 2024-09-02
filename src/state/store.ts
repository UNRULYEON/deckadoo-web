import { createStore } from 'zustand/vanilla'
import { immer } from 'zustand/middleware/immer'
import { devtools, persist } from 'zustand/middleware'

type DeckadooProps = {
  name: string
}

export interface DeckadooState extends DeckadooProps {
  setName: (name: string) => void
}

export type DeckadooStore = ReturnType<typeof createDeckadooStore>

export const createDeckadooStore = (initialProps?: Partial<DeckadooProps>) => {
  const DEFAULT_PROPS: DeckadooProps = {
    name: '',
  }

  return createStore<DeckadooState>()(
    devtools(
      persist(
        immer((set) => ({
          ...DEFAULT_PROPS,
          ...initialProps,
          setName: (name: string) =>
            set((state) => {
              state.name = name
            }),
        })),
        {
          name: 'v0:deckadoo-store',
        }
      ),
      {
        name: 'v0:deckadoo-store',
      }
    )
  )
}
