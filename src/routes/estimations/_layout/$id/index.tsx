import { useCallback, useEffect, useMemo, useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useDeckadooStore, useWebsocket } from '@/hooks'
import type { Card, GamePlayer, ServerGameState, ServerMessage } from '@/types'
import { GameState } from '@/constants'
import { Button } from '@/components'
import { cn } from '@/utils'
import { PlayingCards } from '@/icons'

export const Route = createFileRoute('/estimations/_layout/$id/')({
  component: () => <EstimationGame />,
})

const EstimationGame = () => {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  const playerName = useDeckadooStore((s) => s.name)
  const { sessionId, isConnected, send, registerCallback, deregisterCallback } =
    useWebsocket()
  const [hasJoinedGame, setHasJoinedGame] = useState(false)

  const [players, setPlayers] = useState<GamePlayer[]>([])
  const [gameState, setGameState] = useState<GameState>()
  const [cards, setCards] = useState<Card[]>([])

  const votedCard = useMemo(() => {
    return [...players].find((player) => player.id === sessionId)?.vote?.value
  }, [players, sessionId])

  const gameJoined = (status: ServerMessage['status']) => {
    if (status === 'error') {
      console.log('failed to join game')
      navigate({ to: '/estimations' })
      return
    }

    setHasJoinedGame(true)
  }

  const gameStateUpdate = (
    status: ServerMessage['status'],
    payload: ServerGameState['payload']
  ) => {
    if (status === 'error') {
      console.log('failed to get game state')
      return
    }

    setPlayers((_) => payload.players)
    setGameState((_) => payload.state)
    setCards((_) => payload.cards)
  }

  useEffect(() => {
    const gameJoinId = registerCallback('game-join', gameJoined)
    const gameStateId = registerCallback('game-state', gameStateUpdate)

    return () => {
      deregisterCallback('game-join', gameJoinId)
      deregisterCallback('game-state', gameStateId)
    }
  }, [])

  useEffect(() => {
    send({
      type: 'update-name',
      payload: {
        name: playerName,
      },
    })
  }, [playerName])

  useEffect(() => {
    if (!isConnected || hasJoinedGame) return

    const parsedId = id.split('-').join('')

    if (parsedId.length === 6) {
      send({
        type: 'join-game',
        payload: {
          code: parsedId,
          name: playerName,
        },
      })
    }
  }, [isConnected, id, hasJoinedGame])

  const castVote = useCallback(
    (value: Card['value']) => {
      send({
        type: 'cast-vote',
        payload: {
          value: !votedCard || value !== votedCard ? value : null,
        },
      })
    },
    [send, votedCard]
  )

  const revealCards = useCallback(() => {
    send({
      type: 'reveal-cards',
      payload: null,
    })
  }, [send])

  const resetVotes = useCallback(() => {
    send({
      type: 'start-new-game',
      payload: null,
    })
  }, [send])

  return (
    <div className="w-full h-full flex flex-col gap-[50px] justify-center items-center">
      <div className="flex flex-col items-center">
        {gameState === GameState.WAITING ? (
          <>
            <span className="text-lg font-bold">Waiting</span>
            <span className="text-sm">Share the link</span>
          </>
        ) : gameState === GameState.VOTING &&
          !players.every((p) => p.vote?.value) ? (
          <>
            <span className="text-lg font-bold">Pick a card</span>
            <span className="text-sm">What are you waiting for...</span>
          </>
        ) : gameState === GameState.VOTING &&
          players.every((p) => p.vote?.value) ? (
          <>
            <span className="text-lg font-bold">All set ✅</span>
            <span className="text-sm">Everyone has picked a card</span>
          </>
        ) : gameState === GameState.VOTED ? (
          <>
            <span className="text-lg font-bold">Wow, what a reveal 🎉</span>
            <span className="text-sm">Check out the score</span>
          </>
        ) : null}
      </div>
      <div className="bg-[#F6F6F6] w-min rounded-[10px]">
        <div className="flex p-[50px] gap-4">
          {players.map((player) => (
            <div
              key={player.id}
              className="flex flex-col items-center w-24 gap-4"
            >
              {gameState === GameState.VOTED ? (
                <div
                  className={cn(
                    'flex justify-center items-center w-16 h-24 bg-white rounded-md shadow-[0px_2px_4px_0px_rgba(0,_0,_0,_0.1)] font-suse text-4xl font-bold text-[#7B00FF] '
                  )}
                >
                  {player.vote?.value}
                </div>
              ) : player.vote?.value ? (
                <div
                  className={cn(
                    'flex justify-center items-center w-16 h-24 bg-[#7B00FF] rounded-md',
                    'shadow-[0px_2px_4px_0px_rgba(0,_0,_0,_0.2)]'
                  )}
                >
                  <PlayingCards />
                </div>
              ) : (
                <div className={cn('w-16 h-24 bg-[#D7D7D7] rounded-md')} />
              )}
              <div className="flex flex-col justify-center text-center gap-2 text-sm">
                <span className="font-bold max-w-24 truncate">
                  {player.name || 'Anonymous'}
                </span>
                <span>{player.isSpectator && 'Spectator'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {gameState === GameState.VOTED ? (
        <Button onClick={resetVotes} className="z-10">
          Start new vote
        </Button>
      ) : (
        <Button
          onClick={revealCards}
          disabled={gameState === GameState.WAITING}
          className="z-10"
        >
          Reveal cards
        </Button>
      )}
      <div
        className={cn(
          'absolute right-0 bottom-0 left-0 flex justify-center overflow-clip'
        )}
      >
        {cards.map((card, i) => {
          const middle = Math.floor(cards.length / 2)

          return (
            <Card
              key={card.value}
              value={card.value}
              selected={card.value === votedCard}
              offSet={middle - i}
              onClick={castVote}
            />
          )
        })}
      </div>
    </div>
  )
}

type CardProps = {
  value: Card['value']
  selected: boolean
  offSet: number
  onClick: (value: Card['value']) => void
}

const Card = ({ value, selected = false, offSet, onClick }: CardProps) => {
  const randomNumber = useMemo(() => Math.floor(Math.random() * 5), [])
  const rotateOffset = useMemo(() => -offSet + randomNumber, [])
  const positiveOffset = Math.abs(offSet)

  return (
    <div
      className="relative select-none"
      style={{
        transformOrigin: 'center',
        transform: `rotate(${rotateOffset}deg) translateX(${offSet * 100}px) translateY(${positiveOffset * 5 + (selected ? -120 : 0) + 200}px)`,
      }}
    >
      <div className="absolute w-[210px] h-[300px] shadow-[0px_-3px_30px_0px_rgba(0,_0,_0,_0.14)] -z-10 rounded-[20px]" />
      <div
        className={cn(
          'relative w-[210px] h-[300px] bg-white rounded-[20px] cursor-pointer flex justify-center items-center font-suse text-[#7B00FF] font-bold',
          'shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]'
        )}
        onClick={() => onClick(value)}
      >
        <div className="absolute top-4 left-4 text-4xl">{value}</div>
        <div className="text-8xl">{value}</div>
        <div className="absolute right-4 bottom-4 text-4xl">{value}</div>
      </div>
    </div>
  )
}
