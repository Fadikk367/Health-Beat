import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface User {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
}

interface AuthContextProps {
  login(email: string, password: string): Promise<void | string>;
  register(userData: User): Promise<void | string>; 
  logout(): void; 
  token: string | null; 
  isAuthentificated: boolean; 
  user: User | null;
}

interface LoginResponse {
  token: string;
  user: {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
  }
}

const defaultAuthCOntext = { 
  login: (email: string, password: string): Promise<void> => Promise.reject(), 
  register: (userData: User): Promise<void> => Promise.reject(), 
  logout: (): void => {}, 
  token: null,
  isAuthentificated: false, 
  user: null,
}

const AuthContext = React.createContext<AuthContextProps>(defaultAuthCOntext);

const AuthProvider: React.FC = ({ children }) => {
  const [isAuthentificated, setIsAuthentificated ] = useState(false);
  const [token, setToken ] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await axios.post<LoginResponse>('/auth/login', { email, password });
      const { token, user } = response.data;
      console.log({ token, user });
      setIsAuthentificated(true);
      setToken(token);
      setUser(user);

      return Promise.resolve();
    } catch(err) {
      if (err.isAxiosError) {
        return Promise.reject(err.response.data.message);
      } else {
        return Promise.reject();
      }
    }
  }

  const register = async (userData: User): Promise<void | string> => {
    try {
      const response = await axios.post<LoginResponse>('/auth/register', userData);
      const { token, user } = response.data;
      setIsAuthentificated(true);
      setToken(token);
      setUser(user);

      return Promise.resolve();
    } catch(err) {
      console.log({err});
      return Promise.reject(err.message);
    }
  }

  const logout = (): void => {
    setIsAuthentificated(false);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ login, register, logout, token, isAuthentificated, user }}>
      {children}
    </AuthContext.Provider>
  )
}


export { AuthProvider, AuthContext };