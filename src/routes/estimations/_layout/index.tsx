import { useEffect, useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Select, Button } from '@/components'
import { useWebsocket } from '@/hooks'
import { z } from 'zod'

export const Route = createFileRoute('/estimations/_layout/')({
  component: () => <CreateEstimationGame />,
})

const VOTING_SYSTEMS = ['Fibonacci', 'T-Shirt sizing'] as const

const schema = z.object({
  sessionName: z.string().trim().min(1, 'Session name is required'),
  votingSystem: z.enum(VOTING_SYSTEMS),
})
type Inputs = z.infer<typeof schema>

const CreateEstimationGame = () => {
  const { isConnected, send, message } = useWebsocket()
  const [isCreatingGame, setIsCreatingGame] = useState(false)
  const navigate = useNavigate()

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
    setIsCreatingGame(true)

    send({
      type: 'create-game',
      payload: {
        name: data.sessionName,
        votingSystem: data.votingSystem,
      },
    })
  }

  useEffect(() => {
    if (message && message.type === 'game-create') {
      setIsCreatingGame(false)
      const modifiedCode =
        message.payload.code.slice(0, 3) + '-' + message.payload.code.slice(3)

      navigate({ to: '/estimations/$id', params: { id: modifiedCode } })
    }
  }, [message])

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
        <Button type="submit" disabled={!isConnected || isCreatingGame}>
          Start new game
        </Button>
      </form>
    </div>
  )
}
