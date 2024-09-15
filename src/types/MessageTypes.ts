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

type BaseMessage = {
  status: 'ok' | 'error'
}

type ServerMessages =
  | {
      type: 'game-created'
      payload: {
        code: string
      }
    }
  | { type: 'game-joined'; payload: number }
  | { type: 'game-state'; payload: number }

export type ServerMessage = BaseMessage & ServerMessages
