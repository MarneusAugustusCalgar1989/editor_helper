import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import MainMenu from './components/MainMenu'
import Wrapper from './components/Wrapper'
import Logotyper from './components/Logotyper'
import AudioConverter from './components/AudioConverter'
import Mockuper from './components/Mockuper'
import DocumentCreator from './components/DocumentCreator'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Wrapper>
          <Routes>
            <Route path={'/'} element={<MainMenu />} />

            <Route path={'logotyper'} element={<Logotyper />} />
            <Route path={'audioconverter'} element={<AudioConverter />} />
            <Route path={'mockuper'} element={<Mockuper />} />
            <Route path={'docmaker'} element={<DocumentCreator />} />
          </Routes>
        </Wrapper>
      </div>
    </BrowserRouter>
  )
}

export default App
