import { ReactNode, createContext, useEffect, useState } from 'react'
import { ClientMessage, ServerMessage } from '@/types'

type WebsocketState = {
  ws: WebSocket | null
  isConnected: boolean
  sessionId: string | null
  message: ServerMessage | null
  send: (payload: ClientMessage) => void
  registerCallback: (
    type: ServerMessage['type'],
    callback: (status: ServerMessage['status'], payload: any) => void
  ) => number
  deregisterCallback: (type: ServerMessage['type'], timestamp: number) => void
}

export const WebsocketContext = createContext<WebsocketState | undefined>(
  undefined
)

type WebsocketProps = {
  children: ReactNode
}

export const WebsocketProvider = ({ children }: WebsocketProps) => {
  const [ws, setWs] = useState<WebsocketState['ws']>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isConnected, setIsConnected] =
    useState<WebsocketState['isConnected']>(false)
  const [message, setMessage] = useState<WebsocketState['message']>(null)
  const [callbacks] = useState(
    new Map<
      ServerMessage['type'],
      [number, (status: ServerMessage['status'], payload: any) => void][]
    >()
  )

  useEffect(() => {
    if (ws) return

    const socket = new WebSocket(`ws://localhost:3000/ws/estimations`)

    socket.onopen = () => setIsConnected(true)
    socket.onclose = () => setIsConnected(false)
    socket.onmessage = (event) => {
      const parsedMessage = JSON.parse(event.data) as ServerMessage

      if (!parsedMessage.status || !parsedMessage.type)
        throw new Error('Invalid message received')

      const callbacksForType = callbacks.get(parsedMessage.type)

      console.groupCollapsed(
        `↙ [Server] ${parsedMessage.status.toUpperCase()} - ${parsedMessage.type}`
      )
      console.log(parsedMessage.payload)
      console.groupEnd()

      if (callbacksForType)
        callbacksForType.forEach(([, callback]) =>
          callback(parsedMessage.status, parsedMessage.payload)
        )

      if (parsedMessage.type === 'player-connected') {
        setSessionId(parsedMessage.payload.sessionId)
      }

      setMessage(parsedMessage)
    }

    setWs(socket)

    return () => {
      socket.close()
    }
  }, [])

  const send: WebsocketState['send'] = (payload) => {
    if (!ws) return

    console.groupCollapsed(`↗ [Client] ${payload.type}`)
    console.log(payload)
    console.groupEnd()

    ws.send(JSON.stringify(payload))
  }

  const registerCallback: WebsocketState['registerCallback'] = (
    type,
    callback
  ) => {
    const timestamp = Date.now()

    if (!callbacks.has(type)) {
      callbacks.set(type, [[timestamp, callback]])
    } else {
      const currentCallbacks = callbacks.get(type)
      if (currentCallbacks) {
        callbacks.set(type, [...currentCallbacks, [timestamp, callback]])
      }
    }

    console.groupCollapsed(`☎ Registering callback - ${type} (${timestamp})`)
    console.table({ type, timestamp })
    console.groupEnd()

    return timestamp
  }

  const deregisterCallback: WebsocketState['deregisterCallback'] = (
    type,
    timestamp
  ) => {
    if (!callbacks.has(type)) return

    const currentCallbacks = callbacks.get(type)
    if (currentCallbacks) {
      const newCallbacks = currentCallbacks.filter(([ts]) => ts !== timestamp)
      callbacks.set(type, newCallbacks)
      console.log(`☎ Deregistering callback - ${type} (${timestamp})`)
    }
  }

  return (
    <WebsocketContext.Provider
      value={{
        ws,
        isConnected,
        sessionId,
        message,
        send,
        registerCallback,
        deregisterCallback,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  )
}
