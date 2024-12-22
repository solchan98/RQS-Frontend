import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useErrorRequest } from '../../../hooks/useErrorRequest';
import { Alert } from '@mui/material';

export const AuthLayout = () => {
  const token = localStorage.getItem('accessToken');
  const { errorsState } = useErrorRequest();

  if (!token) {
    return <Navigate to='/login' />;
  }

  return (
    <div>
      {Object.keys(errorsState).map(
        (key) =>
          errorsState[key] && (
            <Alert key={key} severity='error'>
              {errorsState[key].message}
            </Alert>
          ),
      )}
      <Outlet />
    </div>
  );
};
