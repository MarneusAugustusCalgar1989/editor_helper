import { useState } from 'react';
import styles from '../styles/LoginWindow.module.css';
import Wrapper from './Wrapper';

const LoginWindow = () => {
  const [servAnswer, setServAnswer] = useState('');

  const sendForm = async e => {
    e.preventDefault();
    const user = {};
    user.username = e.target.parentNode.username.value;
    user.password = e.target.parentNode.password.value;
    console.log(JSON.stringify(user));

    e.target.parentNode.username.value = '';
    e.target.parentNode.password.value = '';

    await fetch('http://213.59.156.172:3000/authorisate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then(data => data.text())
      .then(text => setServAnswer(text));
  };
  return (
    <div className='App'>
      <Wrapper>
        <div className={styles.sing_in_wrapper}>
          <h1 className={styles.module_header}>LogIn Window</h1>
          <p className={styles.module_second_header}>{servAnswer}</p>
          {servAnswer !== 'ok!' ? (
            <form className={styles.login_form}>
              <input type='text' name='username' />
              <input type='text' name='password' />
              <button onClick={sendForm}>Отправить</button>
            </form>
          ) : (
            <h1 className={styles.module_second_header}>You are logged in</h1>
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default LoginWindow;
