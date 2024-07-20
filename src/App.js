import { createBrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import MainMenu from './components/MainMenu'
import Wrapper from './components/Wrapper'
import Logotyper from './components/Logotyper'
import AudioConverter from './components/AudioConverter'
import Mockuper from './components/Mockuper'
import DocumentCreator from './components/DocumentCreator'

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
