import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Alert } from '@mui/material';
import { useCommonAlert } from '../../../hooks/useCommonAlert';

export const GlobalRedirectHandler = () => {
  const { alertState, onAlert } = useCommonAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = () => {
      navigate('/login');
      onAlert('인증 정보가 만료되었습니다.');
    };

    window.addEventListener('redirectToLogin', handleRedirect);

    return () => {
      window.removeEventListener('redirectToLogin', handleRedirect);
    };
  }, [navigate]);

  return <div>{alertState.active && <Alert severity='error'>{alertState.message}</Alert>}</div>;
};
