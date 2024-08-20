import { useState, useEffect } from 'react';
import { Link, useBeforeUnload } from 'react-router-dom';
import AnimatedPage from './AnimatedPage';
import { useAuth } from '../hooks/useAuth';

const MainMenu = ({ children }) => {
  const context = useAuth();
  if (localStorage.getItem('x-token')) {
    context.user = localStorage.getItem('x-token');
    context.username = localStorage.getItem('username');
  }

  const [serviceON, setServiceOn] = useState(false);

  useEffect(() => {
    const testFetch = async () => {
      try {
        await fetch('http://213.59.156.172:3000/', {
          method: 'POST',
          body: context?.user || 'default-token',
        }).then(data => (data ? setServiceOn(true) : setServiceOn(false)));
      } catch (e) {
        console.log(e.text);
      } finally {
        console.log('Fetched');
      }
    };

    testFetch();
  }, []);
  const reloadWind = () => {
    window.location.reload();
  };

  return (
    <AnimatedPage>
      <main>
        <div className='top_container'>
          <div className='container'>
            <h1 className='main_header_top'>ВСПОМОГАТОР</h1>
          </div>
          <div className='menu_list'>
            {!serviceON && (
              <ul>
                <li onClick={() => reloadWind()}>Сервис временно недоступен</li>
              </ul>
            )}

            {serviceON && !context.user && (
              <ul>
                <li>
                  <Link to='login'>Нужно зарегистрироваться</Link>
                </li>
              </ul>
            )}

            {serviceON && context.user && (
              <ul>
                <li>
                  <Link to='logotyper'>Логотипер</Link>
                </li>
                <li>
                  <Link to='audioconverter'>Звукодел</Link>
                </li>

                <li>
                  <Link to='documentcreator'>Документодел</Link>
                </li>
              </ul>
            )}
          </div>
          <div className='container'>
            <h1 className='main_header_bottom'>ВСПОМОГАТОР</h1>
          </div>
        </div>
      </main>
    </AnimatedPage>
  );
};

export default MainMenu;
