import './App.css';
import MainMenu from './components/MainMenu';
import Wrapper from './components/Wrapper';
import { useAuth } from './hooks/useAuth';

function App() {
  return (
    <div className='App'>
      <Wrapper>
        <MainMenu />
      </Wrapper>
    </div>
  );
}

export default App;
