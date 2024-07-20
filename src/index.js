import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useRouteError,
} from 'react-router-dom'
import MainMenu from './components/MainMenu'
import Logotyper from './components/Logotyper'
import { testAction } from './components/Logotyper'
import Mockuper from './components/Mockuper'
import AudioConverter from './components/AudioConverter'
import DocumentCreator from './components/DocumentCreator'
import ErrorPage from './components/ErrorPage'

function ErrorBoundary() {
  let error = useRouteError()

  return <ErrorPage props={error} />
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} errorElement={<ErrorBoundary />} />
      <Route path="/logotyper" element={<Logotyper />} action={testAction} />
      <Route path="/audioconverter" element={<AudioConverter />} />
      <Route path="/mockuper" element={<Mockuper />} />
      <Route path="/documentcreator" element={<DocumentCreator />} />
    </>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router} />)
