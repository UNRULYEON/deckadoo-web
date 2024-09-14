import { WebsocketProvider } from '@/context'
import { useWebsocket } from '@/hooks'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input, Select } from '@/components'

const VOTING_SYSTEMS = ['Fibonacci', 'T-Shirt sizing'] as const

const schema = z.object({
  sessionName: z.string().trim().min(1, 'Session name is required'),
  votingSystem: z.enum(VOTING_SYSTEMS),
})
type Inputs = z.infer<typeof schema>

const Root = () => {
  const { isConnected, send } = useWebsocket()

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<Inputs>({
    defaultValues: {
      sessionName: '',
      votingSystem: VOTING_SYSTEMS[0],
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: Inputs) => {
    send('create-session', data)
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <form
        className="flex flex-col w-96 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold">New session</h1>
        <div className="flex flex-col gap-3">
          <Input
            label="Session name"
            id="session-name"
            placeholder="Planning poker"
            disabled={!isConnected}
            error={errors.sessionName?.message}
            autoFocus
            {...register('sessionName')}
          />
          <Select
            label="Voting system"
            id="voting-system"
            options={VOTING_SYSTEMS}
            disabled={!isConnected}
            error={errors.votingSystem?.message}
            {...register('votingSystem')}
          />
        </div>
        <Button type="submit" disabled={!isConnected}>
          Start new game
        </Button>
      </form>
    </div>
  )
}

export const root = () => (
  <WebsocketProvider>
    <Root />
  </WebsocketProvider>
)
