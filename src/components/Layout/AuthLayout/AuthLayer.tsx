import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

export const AuthLayout = () => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};
