import React, { useState } from 'react';

import { User } from 'interfaces';
import authService from 'services/AuthService';


interface AuthContextProps {
  loginUser(email: string, password: string): Promise<void | string>;
  registerUser(userData: User): Promise<void | string>; 
  logout(): void; 
  token: string | null; 
  isAuthentificated: boolean; 
  user: User | null;
}

const defaultAuthCOntext = { 
  loginUser: (email: string, password: string): Promise<void> => Promise.reject(), 
  registerUser: (userData: User): Promise<void> => Promise.reject(), 
  logout: (): void => {}, 
  token: null,
  isAuthentificated: false, 
  user: null,
}

const AuthContext = React.createContext<AuthContextProps>(defaultAuthCOntext);


const AuthProvider: React.FC = ({ children }) => {
  const [isAuthentificated, setIsAuthentificated ] = useState(authService.isAuthentificated());
  const [token, setToken ] = useState(authService.getToken());
  const [user, setUser] = useState(authService.getUser());

  const loginUser = async (email: string, password: string): Promise<void> => {
    const { token, user } = await authService.login(email, password);
    setIsAuthentificated(true);
    setToken(token);
    setUser(user);
  }

  const registerUser = async (userData: User): Promise<void> => {
    const { token, user } = await authService.register(userData);
    setIsAuthentificated(true);
    setToken(token);
    setUser(user);
  }

  const logout = (): void => {
    authService.logout();
  }

  return (
    <AuthContext.Provider value={{ loginUser, registerUser, logout, token, isAuthentificated, user }}>
      {children}
    </AuthContext.Provider>
  )
}


export { AuthProvider, AuthContext };