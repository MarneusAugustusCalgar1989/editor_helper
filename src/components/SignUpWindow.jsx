import Wrapper from './Wrapper'
import styles from '../styles/LoginWindow.module.css'
import { useState } from 'react'
import UsersList from './UsersList'

const SignUpWindow = () => {
  const [servAnswer, setServAnswer] = useState('')
  const [showUser, setShowUser] = useState(false)

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
      .then((text) => setServAnswer(text))
  }

  const jwtTest = async () => {
    await fetch('http://213.59.156.172:3000/', { method: 'GET' }).then((data) =>
      console.log(data)
    )
  }

  return (
    <div className="App">
      <Wrapper>
        <div className={styles.sing_in_wrapper}>
          <h1 className={styles.module_header}>Sign Up</h1>

          <form className={styles.login_form}>
            <input type="text" name="username" />
            <input type="text" name="password" />
            <button onClick={sendForm}>Отправить</button>
          </form>
          <button
            onClick={() => {
              setShowUser(!showUser)
              jwtTest()
            }}
          >
            Показать список пользователей
          </button>
          {showUser && <UsersList />}
        </div>
      </Wrapper>
    </div>
  )
}

export default SignUpWindow
