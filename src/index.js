import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useRouteError,
} from 'react-router-dom';
import Logotyper from './pages/Logotyper';
import Mockuper from './pages/Mockuper';
import AudioConverter from './pages/AudioConverter';
import DocumentCreator from './pages/DocumentCreator';
import ErrorPage from './components/ErrorPage';
import LoginWindow from './components/LoginWindow';
import SignUpWindow from './components/SignUpWindow';
import RequireAuth from './components/hoc/RequireAuth';
import { AuthProvider } from './components/hoc/AuthProvider';
import Profile from './pages/Profile';

function ErrorBoundary() {
  let error = useRouteError();

  return <ErrorPage props={error} />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />} errorElement={<ErrorBoundary />} />
      <Route path='/logotyper' element={<Logotyper />} />
      <Route
        path='/audioconverter'
        element={
          <RequireAuth>
            <AudioConverter />
          </RequireAuth>
        }
      />
      <Route path='/mockuper' element={<Mockuper />} />
      <Route path='/documentcreator' element={<DocumentCreator />} />
      <Route path='/login' element={<LoginWindow />} />
      <Route path='/signup' element={<SignUpWindow />} />
      <Route
        path='/profile'
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
