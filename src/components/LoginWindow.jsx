import { useState } from 'react';
import styles from '../styles/LoginWindow.module.css';
import Wrapper from './Wrapper';
import { Navigate, redirect, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import AnimatedPage from './AnimatedPage';
import CustomForm from './form/CustomForm';
import { loginFormConfig, loginInitState } from './form/formConfig';

const LoginWindow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';
  const [servAnswer, setServAnswer] = useState('Try again later');
  const [username, setUsername] = useState('');
  const [showFeedback, setShowFeedback] = useState('');

  const [formState, setFormState] = useState(loginInitState);

  const context = useAuth();

  const formChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    if (!/[^a-zA-Z0-9А-Яа-яЁё]/.test(value)) {
      setFormState(prev => ({ ...prev, [name]: value }));
    }
  };

  const sendForm = async e => {
    e.preventDefault();
    const user = {};
    user.username = formState.login;
    user.password = formState.password;
    console.log(JSON.stringify(user));

    formState.login = '';
    formState.password = '';

    await fetch('http://213.59.156.172:3000/authorisate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then(data => data.text())
      .then(text => {
        setServAnswer(text);
        setUsername(user.username);
        setShowFeedback(text);
        if (text !== 'Неверный пароль') {
          context.user = text;
          context.username = user.username;
          localStorage.setItem('x-token', text);
          localStorage.setItem('username', user.username);
          setShowFeedback('');
        }
      });
  };
  return (
    <div className='App'>
      <Wrapper>
        <AnimatedPage>
          <div className={styles.sing_in_wrapper}>
            <h1 className={styles.module_header}>LogIn Window</h1>
            {/* <p>{fromPage}</p>*/}

            {showFeedback && (
              <p className={styles.module_second_header}>{servAnswer}</p>
            )}

            {servAnswer === 'Try again later' || !context.user ? (
              <form className='form_container' onSubmit={sendForm}>
                {loginFormConfig.map(item => (
                  <CustomForm
                    key={item.name}
                    placeholder={item.placeholder}
                    value={formState[item.name]}
                    onChange={formChange}
                    {...item}
                  />
                ))}
                <button className='form_button'>Log In</button>
              </form>
            ) : (
              <h1 className={styles.module_second_header}>
                You are logged in as{' '}
                <span
                  style={{ color: 'var(--accent_purple)', cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  {username}
                </span>
                !
              </h1>
            )}
          </div>
        </AnimatedPage>
      </Wrapper>
    </div>
  );
};

export default LoginWindow;
