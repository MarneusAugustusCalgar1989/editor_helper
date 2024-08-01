import Wrapper from './Wrapper'
import styles from '../styles/LoginWindow.module.css'
import { useState } from 'react'
import CustomForm from './CustomForm'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AnimatedPage from './AnimatedPage'

const SignUpWindow = () => {
  const [servAnswer, setServAnswer] = useState('')
  const [showUser, setShowUser] = useState(false)
  const context = useAuth()
  const navigate = useNavigate()

  const sendForm = async (e) => {
    e.preventDefault()
    const user = {}
    user.username = e.target.parentNode.username.value
    user.password = e.target.parentNode.password.value
    console.log(JSON.stringify(user))

    e.target.parentNode.username.value = ''
    e.target.parentNode.password.value = ''

    await fetch('http://213.59.156.172:3000/singingin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((data) => data.text())
      .then((text) => {
        setServAnswer(text)
        context.username = user.username
      })

    await fetch('http://213.59.156.172:3000/authorisate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((data) => data.text())
      .then((text) => {
        context.user = text
        context.username = user.username
      })
  }

  return (
    <div className="App">
      <Wrapper>
        <AnimatedPage>
          {!servAnswer ? (
            <div className={styles.sing_in_wrapper}>
              <h1 className={styles.module_header}>Sign Up</h1>
              <CustomForm func={sendForm} />
            </div>
          ) : (
            <h1 className={styles.module_second_header}>
              You are logged in as{' '}
              <span
                style={{ color: 'var(--accent_purple)', cursor: 'pointer' }}
                onClick={() => {
                  navigate('/')
                }}
              >
                {context.username}
              </span>
              !
            </h1>
          )}
        </AnimatedPage>
      </Wrapper>
    </div>
  )
}

export default SignUpWindow
