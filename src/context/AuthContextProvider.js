import { createContext, useState } from 'react'
import localStorageService from '../services/localStorageService'

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorageService.getToken());
  const [user, setUser] = useState({});
  const [bookingList, setBookingList] = useState({});

  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, bookingList, setBookingList }}>
    {children}
  </AuthContext.Provider>
};

export default AuthContextProvider;