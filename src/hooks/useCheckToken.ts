import store from 'store';
import { reissueAtk } from '../service/member';
import jwtDecode from 'jwt-decode';
import { useLogout } from './useLogout';
import { useState } from 'react';

export const useCheckToken = () => {
  const [tokenChecked, setTokenChecked] = useState(false);

  const logout = useLogout();
  const checkExpired = (exp: number) => {
    const isAlive = exp > Date.now() / 1000;
    if (!isAlive) {
      reissueAtk()
        .then(() => setTokenChecked(true))
        .catch(logout);
    } else {
      setTokenChecked(true);
    }
  };
  const checkToken = () => {
    const atk = store.get('atk');
    if (atk === undefined || atk === null) {
      setTokenChecked(true);
      return;
    }
    const decoded: { exp: number; iat: number; sub: string } = jwtDecode(atk);
    checkExpired(decoded.exp);
  };

  return { tokenChecked, checkToken };
};
