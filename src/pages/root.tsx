import { DeckCard } from '@/components'

export const root = () => {
  return (
    <div className="mt-8 px-10 pb-10">
      <main>
        <DeckCard
          title="Estimation"
          type="Sizing"
          description="A short description of what this deck is and how you can use it."
          href="/estimations"
        />
      </main>
    </div>
  )
}
