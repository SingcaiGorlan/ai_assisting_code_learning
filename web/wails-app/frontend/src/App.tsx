import AppRouter from './routes'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'

function App() {
  return (
    <Theme accentColor="blue" appearance="dark" radius="medium">
      <AppRouter />
    </Theme>
  )
}

export default App
