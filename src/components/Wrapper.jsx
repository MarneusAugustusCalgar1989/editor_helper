import { NavLink } from 'react-router-dom'

const Wrapper = ({ children }) => {
  return (
    <>
      <header>
        <div className="header_logo">
          <NavLink to="/">LOGO</NavLink>
        </div>

        <div className="header_auth">
          <div className="header_sign_in">
            <NavLink to="/signup">Sign in</NavLink>
          </div>
          <div className="header_log_in">
            <NavLink to="/login">Log in</NavLink>
          </div>
        </div>
      </header>
      {children}
      <footer>SOME FOOTER</footer>
    </>
  )
}

export default Wrapper
