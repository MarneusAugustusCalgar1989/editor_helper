import { useState, createContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  const logIn = (user, username, cb) => {
    setUser(user);
    setUsername(username);

    cb();
  };

  const signIn = (user, username, cb) => {
    //Разобраться
    setUser(user);
    setUsername(username);

    cb();
  };

  const logOut = cb => {
    cb();
  };
  const value = { user, username, logIn, signIn, logOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
