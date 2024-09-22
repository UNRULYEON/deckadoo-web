import type { Card } from '@/types'

export type GamePlayer = {
  id: string
  name: string
  vote: Card | null
  isSpectator: boolean
}
