import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect } from 'react';
import { useErrorRequest } from '../../../hooks/useErrorRequest';

export const GlobalRedirectHandler = () => {
  const { setErrorState } = useErrorRequest();
  const navigate = useNavigate();

  const handleRedirect = useCallback(() => {
    navigate('/login');
    setErrorState({ key: 'login', status: 401, message: '인증 정보가 만료되었습니다.' }, 3000);
  }, [navigate, setErrorState]);

  useEffect(() => {
    window.addEventListener('redirectToLogin', handleRedirect);

    return () => {
      window.removeEventListener('redirectToLogin', handleRedirect);
    };
  }, []);

  return <div />;
};
