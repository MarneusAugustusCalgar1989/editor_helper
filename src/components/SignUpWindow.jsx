import Wrapper from './Wrapper';
import styles from '../styles/LoginWindow.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AnimatedPage from './AnimatedPage';
import CustomForm from './form/CustomForm';
import { formConfig, initState } from './form/formConfig';

const SignUpWindow = () => {
  const [servAnswer, setServAnswer] = useState('');
  const [showUser, setShowUser] = useState(false);
  const context = useAuth();
  const navigate = useNavigate();
  const [formState, setFormState] = useState(initState);

  const formChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const sendTest = e => {
    e.preventDefault();
    if (formState.password === formState.duplicate) {
      console.log('Passwords equals');
      console.log('Send data');
    } else {
      console.log('Passwords not equal');
      console.log('Set error');
    }

    console.log(formState);
  };

  const sendForm = async e => {
    e.preventDefault();
    const user = {};
    user.username = e.target.parentNode.username.value;
    user.password = e.target.parentNode.password.value;
    console.log(JSON.stringify(user));

    e.target.parentNode.username.value = '';
    e.target.parentNode.password.value = '';

    await fetch('http://213.59.156.172:3000/singingin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then(data => data.text())
      .then(text => {
        setServAnswer(text);
        context.username = user.username;
      });

    await fetch('http://213.59.156.172:3000/authorisate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then(data => data.text())
      .then(text => {
        context.user = text;
        context.username = user.username;
      });
  };

  return (
    <div className='App'>
      <Wrapper>
        <AnimatedPage>
          {!servAnswer ? (
            <div className={styles.sing_in_wrapper}>
              <h1 className={styles.module_header}>Sign In</h1>
              <p>Здесь должна быть форма</p>

              <form className='form_container' onSubmit={sendTest}>
                {formConfig.map(item => (
                  <CustomForm
                    key={item.key}
                    {...item}
                    value={formState[item.name]}
                    onChange={formChange}
                    error={item.validate?.(formState)}
                  />
                ))}
                <button className='form_button'>Registration</button>
              </form>
            </div>
          ) : (
            <h1 className={styles.module_second_header}>
              You are logged in as{' '}
              <span
                style={{ color: 'var(--accent_purple)', cursor: 'pointer' }}
                onClick={() => {
                  navigate('/');
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
  );
};

export default SignUpWindow;
