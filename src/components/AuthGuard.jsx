import React from 'react';
import { Navigate } from 'react-router-dom';

export function isTokenExpired(token) {
  try {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    const currentTime = Date.now() / 1000;

    return decodedPayload.exp < currentTime;
  } catch (error) {
    console.error("توکن معتبر نیست یا خطا در تحلیل توکن:", error);
    return true;
  }
}

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem('access_token');

  if (!token || isTokenExpired(token)) {
    alert("جلسه شما منقضی شده است. لطفاً دوباره وارد شوید.");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
