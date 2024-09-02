import { router } from '@/pages'
import { Header } from '@/components'
import { Route, Switch } from 'wouter'

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={router.root} />
        <Route path="/estimations" component={router.estimations.root} />
        <Route>404</Route>
      </Switch>
    </>
  )
}

export default App
