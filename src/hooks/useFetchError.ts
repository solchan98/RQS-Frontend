import { AxiosError } from 'axios';
import { useLogout } from './useLogout';
import { useNavigate } from 'react-router-dom';

export const useFetchError = () => {
  const logout = useLogout();
  const nav = useNavigate();
  return (err: AxiosError<{ message: string }>) => {
    if (err.response?.status === 401) {
      logout();
    } else {
      nav(-1);
      alert(err.response?.data.message);
    }
  };
};
