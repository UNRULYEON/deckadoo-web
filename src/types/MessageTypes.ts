import type {
  ServerGameCreate,
  ServerGameJoined,
  ServerGameState,
  ServerPlayerConnected,
} from '@/types'

export type ClientMessage =
  | {
      type: 'create-game'
      payload: {
        name: string
        votingSystem: 'Fibonacci' | 'T-Shirt sizing'
      }
    }
  | {
      type: 'join-game'
      payload: {
        code: string
        name: string
      }
    }
  | {
      type: 'update-name'
      payload: {
        name: string
      }
    }
  | {
      type: 'cast-vote'
      payload: {
        value: string | null
      }
    }
  | {
      type: 'reveal-cards'
      payload: null
    }
  | {
      type: 'start-new-game'
      payload: null
    }

type BaseMessage = {
  status: 'ok' | 'error'
}

type ServerMessages =
  | ServerPlayerConnected
  | ServerGameCreate
  | ServerGameJoined
  | ServerGameState

export type ServerMessage = BaseMessage & ServerMessages
