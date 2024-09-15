import { ReactNode, createContext, useEffect, useState } from 'react'
import { ClientMessage, ServerMessage } from '@/types'

type WebsocketState = {
  ws: WebSocket | null
  isConnected: boolean
  message: ServerMessage | null
  send: (payload: ClientMessage) => void
}

export const WebsocketContext = createContext<WebsocketState | undefined>(
  undefined
)

type WebsocketProps = {
  children: ReactNode
}

export const WebsocketProvider = ({ children }: WebsocketProps) => {
  const [ws, setWs] = useState<WebsocketState['ws']>(null)
  const [isConnected, setIsConnected] =
    useState<WebsocketState['isConnected']>(false)
  const [message, setMessage] = useState<WebsocketState['message']>(null)

  useEffect(() => {
    if (ws) return

    const socket = new WebSocket(`ws://localhost:3000/ws/estimations`)

    socket.onopen = () => setIsConnected(true)
    socket.onclose = () => setIsConnected(false)
    socket.onmessage = (event) => {
      const parsedMessage = JSON.parse(event.data)

      if (!parsedMessage.type || !parsedMessage.payload)
        throw new Error('Invalid message received')

      setMessage(parsedMessage)
    }

    setWs(socket)

    return () => {
      socket.close()
    }
  }, [])

  const send: WebsocketState['send'] = (payload) => {
    if (!ws) return

    ws.send(JSON.stringify(payload))
  }

  return (
    <WebsocketContext.Provider
      value={{
        ws,
        isConnected,
        message,
        send,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  )
}
