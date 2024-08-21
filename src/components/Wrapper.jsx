import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Wrapper = ({ children }) => {
  const context = useAuth();

  return (
    <>
      <header>
        <div className='header_logo'>
          <NavLink to='/'>HOME</NavLink>
        </div>

        <div className='header_auth'>
          {!context.user ? (
            <>
              <div className='header_sign_in'>
                <NavLink to='/signup'>Sign in</NavLink>
              </div>
              <div className='header_log_in'>
                <NavLink to='/login'>Log in</NavLink>
              </div>
            </>
          ) : (
            <>
              <div className='header_sign_in'>
                <NavLink
                  to='/login'
                  onClick={() => {
                    context.user = '';
                    context.username = '';
                    localStorage.removeItem('x-token');
                    localStorage.removeItem('username');
                  }}
                >
                  Log Out
                </NavLink>
              </div>
              <div className='header_sign_in'>
                <NavLink to='/profile'>{context.username}</NavLink>
              </div>
            </>
          )}
        </div>
      </header>
      {children}
      <footer>
        <p>{context?.username || 'some footer'}</p>
      </footer>
    </>
  );
};

export default Wrapper;
