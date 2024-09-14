import { WebsocketContext } from '@/context'
import { useContext } from 'react'

export const useWebsocket = () => {
  const context = useContext(WebsocketContext)

  if (!context)
    throw new Error('useWebsocket must be used within a WebsocketProvider')

  return context
}

export default useWebsocket
