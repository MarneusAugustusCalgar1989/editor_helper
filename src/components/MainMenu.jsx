import { NavLink, Routes, Route, Link, BrowserRouter } from 'react-router-dom'

const MainMenu = ({ children }) => {
  const currentUrl = window.location.href
  console.log(currentUrl)
  return (
    <main>
      <div class="top_container">
        <div class="container">
          <h1 class="main_header_top">ВСПОМОГАТОР</h1>
        </div>
        <div class="menu_list">
          <ul>
            <li>
              <NavLink to="logotyper">Логотипер</NavLink>
            </li>
            <li>
              <NavLink to="audioconverter">Звукодел</NavLink>
            </li>
            <li>
              <NavLink to="mockuper">Мокапошная</NavLink>
            </li>
            <li>
              <NavLink to="docmaker">Документодел</NavLink>
            </li>
          </ul>
        </div>
        <div class="container">
          <h1 class="main_header_bottom">ВСПОМОГАТОР</h1>
        </div>
      </div>
    </main>
  )
}

export default MainMenu
