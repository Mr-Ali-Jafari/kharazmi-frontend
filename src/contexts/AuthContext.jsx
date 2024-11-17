import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const login = (accessToken, refreshToken) => {
    setToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };

  const logout = () => {
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ token, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
