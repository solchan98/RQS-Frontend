import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const GlobalRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = () => {
      navigate('/auth/login');
    };

    window.addEventListener('redirectToLogin', handleRedirect);

    return () => {
      window.removeEventListener('redirectToLogin', handleRedirect);
    };
  }, [navigate]);

  return null;
};
