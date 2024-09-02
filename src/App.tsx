import { DeckCard, Header } from '@/components'

const App = () => {
  return (
    <div className="flex flex-col gap-[32px] p-10">
      <Header />
      <main>
        <DeckCard
          title="Estimation"
          type="Sizing"
          description="A short description of what this deck is and how you can use it."
        />
      </main>
    </div>
  )
}

export default App
