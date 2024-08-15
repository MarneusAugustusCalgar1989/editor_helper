import { useState } from 'react';
import styles from '../styles/LoginWindow.module.css';
import Wrapper from './Wrapper';
import { Navigate, redirect, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import AnimatedPage from './AnimatedPage';

const LoginWindow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';
  const [servAnswer, setServAnswer] = useState('Try again later');
  const [username, setUsername] = useState('');
  const [showFeedback, setShowFeedback] = useState('');

  const context = useAuth();

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
      .then(text => {
        setServAnswer(text);
        setUsername(user.username);
        setShowFeedback(text);
        if (text !== 'Неверный пароль') {
          context.user = text;
          context.username = user.username;
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
              <p>Здесь должна быть форма</p>
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
