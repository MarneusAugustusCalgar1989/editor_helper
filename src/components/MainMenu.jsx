import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AnimatedPage from './AnimatedPage'
import { useAuth } from '../hooks/useAuth'
import envirConfig from './envir_config/envirConfig'

const MainMenu = ({ children }) => {
  const context = useAuth()
  if (context.item) {
    context.item = ''
  }

  const [serviceON, setServiceOn] = useState()

  useEffect(() => {
    const testFetch = async () => {
      try {
        await fetch(envirConfig.serverURL, {
          method: 'POST',
          body: context?.user || 'default-token',
        }).then((data) => {
          if (data) {
            setServiceOn(true)
            context.setServiceON(true)
          } else {
            setServiceOn(false)
          }
        })
      } catch (e) {
        console.log(e.text)
      } finally {
        console.log('Fetched')
      }
    }

    testFetch()
  }, [context.user, context.serviceON])

  return (
    <AnimatedPage>
      <main>
        <div className="top_container">
          <div className="container">
            <h1 className="main_header_top">ВСПОМОГАТОР</h1>
          </div>
          <div className="menu_list">
            {!serviceON && (
              <ul>
                <li onClick={() => window.location.reload()}>
                  Сервис временно недоступен
                </li>
              </ul>
            )}

            {serviceON && !context.user && (
              <ul>
                <li>
                  <Link to="login">Нужно зарегистрироваться</Link>
                </li>
              </ul>
            )}

            {serviceON && context.user && (
              <ul>
                <li>
                  <Link to="logotyper">Логотипер</Link>
                </li>
                <li>
                  <Link to="audioconverter">Звукодел</Link>
                </li>

                <li>
                  <Link to="documentcreator">Документодел</Link>
                </li>
              </ul>
            )}
          </div>
          <div className="container">
            <h1 className="main_header_bottom">ВСПОМОГАТОР</h1>
          </div>
        </div>
      </main>
    </AnimatedPage>
  )
}

export default MainMenu
