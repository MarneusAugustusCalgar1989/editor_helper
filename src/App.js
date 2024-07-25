import { AnimatePresence } from 'framer-motion'
import './App.css'
import MainMenu from './components/MainMenu'
import Wrapper from './components/Wrapper'
import { useLocation } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Wrapper>
        <MainMenu />
      </Wrapper>
    </div>
  )
}

export default App
