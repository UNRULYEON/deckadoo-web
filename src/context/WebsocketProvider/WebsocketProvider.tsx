import { ReactNode, createContext, useEffect, useState } from 'react'

type WebsocketState = {
  ws: WebSocket | null
  isConnected: boolean
  message: unknown | null
  send: (topic: string, payload: unknown) => void
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

    const socket = new WebSocket(`ws://localhost:3000/ws`)

    socket.onopen = () => setIsConnected(true)
    socket.onclose = () => setIsConnected(false)
    socket.onmessage = (event) => setMessage(event.data)

    setWs(socket)

    return () => {
      socket.close()
    }
  }, [])

  const send: WebsocketState['send'] = (topic, payload) => {
    if (!ws) return

    ws.send(JSON.stringify({ topic, payload }))
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
