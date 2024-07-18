import { NavLink } from 'react-router-dom'

const Wrapper = ({ children }) => {
  return (
    <>
      <header>
        <div className="header_logo">
          <NavLink to="/">LOGO</NavLink>
        </div>

        <div className="header_auth">
          <div className="header_sign_in">Sign in</div>
          <div className="header_log_in">Log in</div>
        </div>
      </header>
      {children}
      <footer>SOME FOOTER</footer>
    </>
  )
}

export default Wrapper
