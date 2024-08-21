import { createContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  let user = localStorage.getItem('x-token') || null;
  let username = localStorage.getItem('username') || null;

  const value = { user, username };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
