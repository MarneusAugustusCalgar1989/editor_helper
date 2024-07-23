import { Link } from 'react-router-dom';

const MainMenu = ({ children }) => {
  const currentUrl = window.location.href;
  return (
    <main>
      <div className='top_container'>
        <div className='container'>
          <h1 className='main_header_top'>ВСПОМОГАТОР</h1>
        </div>
        <div className='menu_list'>
          <ul>
            <li>
              <Link to='logotyper'>Логотипер</Link>
            </li>
            <li>
              <Link to='audioconverter'>Звукодел</Link>
            </li>
          </ul>
        </div>
        <div className='container'>
          <h1 className='main_header_bottom'>ВСПОМОГАТОР</h1>
        </div>
      </div>
    </main>
  );
};

export default MainMenu;
