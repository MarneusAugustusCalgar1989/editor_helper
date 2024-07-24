import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MainMenu = ({ children }) => {
  const currentUrl = window.location.href;
  const [serviceON, setServiceOn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const testFetch = async () => {
      try {
        await fetch('http://213.59.156.172:3000/cleaner_for_img', {
          method: 'POST',
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
    <main>
      <div className='top_container'>
        <div className='container'>
          <h1 className='main_header_top'>ВСПОМОГАТОР</h1>
        </div>
        <div className='menu_list'>
          {serviceON ? (
            <ul>
              <li>
                <Link to='logotyper'>Логотипер</Link>
              </li>
              <li>
                <Link to='audioconverter'>Звукодел</Link>
              </li>
            </ul>
          ) : (
            <ul onClick={reloadWind}>
              <li>Сервис временно недоступен</li>
            </ul>
          )}
        </div>
        <div className='container'>
          <h1 className='main_header_bottom'>ВСПОМОГАТОР</h1>
        </div>
      </div>
    </main>
  );
};

export default MainMenu;
