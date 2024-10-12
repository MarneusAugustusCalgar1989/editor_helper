import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'

const Wrapper = ({ children }) => {
  const context = useAuth()
  useEffect(() => {}, [context.serviceON])

  return (
    <>
      {context.serviceON && (
        <header onLoad={(e) => console.log('loaded')}>
          <div className="header_logo">
            <NavLink to="/">вспомогатор</NavLink>
          </div>

          <div className="header_auth">
            {!context.user ? (
              <>
                <div className="header_sign_in">
                  <NavLink to="/signup">Рега</NavLink>
                </div>
                <div className="header_log_in">
                  <NavLink to="/login">Логинь</NavLink>
                </div>
              </>
            ) : (
              <>
                <div className="header_sign_in">
                  <NavLink
                    to="/login"
                    onClick={() => {
                      context.user = ''
                      context.username = ''
                      localStorage.removeItem('x-token')
                      localStorage.removeItem('username')
                    }}
                  >
                    Выйти
                  </NavLink>
                </div>
                <div className="header_sign_in">
                  <NavLink to="/profile">{context.username}</NavLink>
                </div>
              </>
            )}
          </div>
        </header>
      )}
      {children}
      {context.serviceON && (
        <footer>
          <p>{context?.username || 'Добро пожаловать! '}</p>
        </footer>
      )}
    </>
  )
}

export default Wrapper
