import { AxiosError } from 'axios';
import { useLogout } from './useLogout';
import { useNavigate } from 'react-router-dom';

export const useFetchError = (errorHandler?: Function) => {
  const logout = useLogout();
  const nav = useNavigate();
  return (err: AxiosError<{ message: string }>) => {
    if (errorHandler) {
      errorHandler();
    }

    if (err.response?.status === 401) {
      logout();
    } else {
      nav(-1);
      alert(err.response?.data.message);
    }
  };
};
