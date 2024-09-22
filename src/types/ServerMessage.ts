import { GameState } from '@/constants'
import { Card, GamePlayer } from '@/types'

export type ServerPlayerConnected = {
  type: 'player-connected'
  payload: {
    sessionId: string
  }
}

export type ServerGameCreate = {
  type: 'game-create'
  payload: {
    code: string
  }
}

export type ServerGameJoined = {
  type: 'game-join'
  payload: null
}

export type ServerGameState = {
  type: 'game-state'
  payload: {
    name: string
    cards: Card[]
    players: GamePlayer[]
    state: GameState
  }
}
