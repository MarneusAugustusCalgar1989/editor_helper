import Wrapper from './Wrapper'
import App from '../App'
import AnimatedPage from './AnimatedPage'
import { AnimatePresence } from 'framer-motion'

const LogInSignUp = ({ incomingType }) => {
  return (
    <div className="App">
      <Wrapper>
        <AnimatedPage>
          {incomingType === 'login' ? (
            <div className="loginWrapper">
              <h1 className="module_header">Log In Window</h1>
            </div>
          ) : (
            <div className="loginWrapper">
              <h1 className="module_header">Sign Up Window</h1>
            </div>
          )}
        </AnimatedPage>
      </Wrapper>
    </div>
  )
}

export default LogInSignUp
