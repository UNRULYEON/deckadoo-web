import { WebsocketProvider } from '@/context'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/estimations/_layout')({
  component: () => <EstimationsLayout />,
})

const EstimationsLayout = () => {
  return (
    <WebsocketProvider>
      <Outlet />
    </WebsocketProvider>
  )
}
