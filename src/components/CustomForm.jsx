import { useState } from 'react'
import styles from '../styles/CustomForm.module.css'

const CustomForm = ({ func }) => {
  const [loginCondition, setLoginCondition] = useState(false)
  const [passwordCondition, setPasswordCondition] = useState(false)

  const checkCondition = (e) => {
    if (e.target.name === 'username') {
      e.target.value.length >= 5
        ? setLoginCondition(true)
        : setLoginCondition(false)
    } else if (e.target.name === 'password') {
      e.target.value.length >= 5
        ? setPasswordCondition(true)
        : setPasswordCondition(false)
    } else {
      alert('Что-то пошло не так! ')
    }
  }

  return (
    <form className={styles.login_form}>
      <input
        type="text"
        name="username"
        onChange={checkCondition}
        maxLength={30}
        required
      />
      <input
        type="text"
        name="password"
        onChange={checkCondition}
        maxLength={30}
        required
      />
      {loginCondition && passwordCondition && (
        <button onClick={func}>Отправить</button>
      )}
    </form>
  )
}

export default CustomForm
