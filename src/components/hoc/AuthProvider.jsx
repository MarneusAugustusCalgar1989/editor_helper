import { createContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
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

  const value = { user, username, refreshState, logOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
