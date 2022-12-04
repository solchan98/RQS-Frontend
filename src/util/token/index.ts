import store from 'store';
import jwtDecode from 'jwt-decode';
import { reissueAtk } from 'service/member';

const clearToken = () => {
  alert('토큰 전체 만료. 새로 로그인 진행하세요!');
  store.clearAll();
};

export const tokenChecker = async (token: string) => {
  if (!token) return;
  const isExpired = jwtExpiredChecker(token);
  if (isExpired) {
    // TODO: catch 시, 로그아웃 시키도록!
    await reissueAtk().catch(clearToken);
  }
};

export const jwtExpiredChecker = (atk: string): boolean => {
  const decoded: { exp: number; iat: number; sub: string } = jwtDecode(atk);
  const currentTime = new Date().getTime() / 1000;
  return currentTime > decoded.exp;
};
