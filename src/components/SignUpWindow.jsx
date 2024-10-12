import Wrapper from './Wrapper'
import styles from '../styles/LoginWindow.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AnimatedPage from './AnimatedPage'
import CustomForm from './form/CustomForm'
import { signUpConfig, initState } from './form/formConfig'
import testFetch from './hoc/testFetch'
import envirConfig from './envir_config/envirConfig'

const SignUpWindow = () => {
  const [servAnswer, setServAnswer] = useState('')
  const context = useAuth()
  useEffect(() => {
    testFetch(context.setServiceON, context)
  }, [context.user, context.serviceON, context])
  const navigate = useNavigate()
  const [formState, setFormState] = useState(initState)
  const [showSendButton, setShowSendButton] = useState(false)

  const formChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    if (!/[^a-zA-Z0-9А-Яа-яЁё]/.test(value) || name === 'email') {
      setFormState((prev) => ({ ...prev, [name]: value }))
    }

    if (
      formState.password === formState.duplicate &&
      formState.name !== '' &&
      formState.password !== ''
    ) {
      setShowSendButton(false)
    } else {
      setShowSendButton(true)
    }
  }

  const sendForm = async (e) => {
    e.preventDefault()
    const user = {}
    user.username = formState.name
    user.password = formState.password
    console.log(JSON.stringify(user))

    try {
      await fetch(envirConfig.serverURL + '/singingin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
        .then((data) => data.text())
        .then((text) => {
          setServAnswer(text)
          context.username = user.username
        })

      await fetch(envirConfig.serverURL + '/authorisate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
        .then((data) => data.text())
        .then((text) => {
          context.user = text
          context.username = user.username
          localStorage.setItem('x-token', text)
        })
    } catch (e) {
      console.log(e)
    } finally {
      console.log('Attempt to sign in')
    }
  }

  return (
    <div className="App">
      <Wrapper>
        <AnimatedPage>
          {!servAnswer ? (
            <div className={styles.sing_in_wrapper}>
              <h1 className={styles.module_header}>Sign In</h1>

              <form className="form_container" onSubmit={sendForm}>
                {signUpConfig.map((item) => (
                  <CustomForm
                    key={item.name}
                    {...item}
                    value={formState[item.name]}
                    onChange={formChange}
                    error={item.validate?.(formState)}
                  />
                ))}
                {showSendButton && (
                  <button className="form_button">Registration</button>
                )}
              </form>
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
