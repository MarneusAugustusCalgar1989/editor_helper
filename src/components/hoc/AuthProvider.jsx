import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [serviceON, setServiceON] = useState();

  let user = localStorage.getItem('x-token') || null;
  let username = localStorage.getItem('username') || null;

  // let item = {};
  const refreshState = () => {
    // return (item = {});
  };

  const logOut = () => {
    user = '';
    username = '';
  };

  const value = {
    user,
    username,
    serviceON,
    setServiceON,
    refreshState,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
