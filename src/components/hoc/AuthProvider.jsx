import { useState, createContext } from 'react'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const logIn = (user, cb) => {
    setUser(user)
    cb()
  }

  const signIn = (user, cb) => {
    setUser(user)
    cb()
  }

  const logOut = (cb) => {
    cb()
  }
  const value = { user, logIn, signIn, logOut }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
