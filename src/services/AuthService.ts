import axios from 'api/axiosInstance';

import { User } from "interfaces";

interface LoginResponse {
  token: string;
  user: User;
}


class AuthService {
  public async register(userData: User): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>('/auth/register', userData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch(err) {
      if (err.isAxiosError) {
        console.log(err.response.data);
        return Promise.reject(err.response.data.message);
      } else {
        return Promise.reject('pop');
      }
    }
  }

  public async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>('/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch(err) {
      if (err.isAxiosError) {
        console.log(err.response.data);
        return Promise.reject(err.response.data.message);
      } else {
        return Promise.reject();
      }
    }
  }

  public logout(): void {
    localStorage.clear();
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isAuthentificated(): boolean {
    return (!!this.getToken() && !!this.getUser());
  }

  public getUser(): User | null {
    const userStr = localStorage.getItem('user');

    if (userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        return user;
      } catch(err) {
        return null;
      }
    } else {
      return null;
    }
  }
}

export default new AuthService();