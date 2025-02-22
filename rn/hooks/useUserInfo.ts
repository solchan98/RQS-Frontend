import { useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';
import useSessionStore from '../state/useSessionStore';

interface ITokenUserAuthority {
  authority: string;
}

interface ITokenUserInfo {
  id: number;
  email: string;
  name: string;
  authorities: ITokenUserAuthority[];
}

interface ITokenPayload {
  sub: string;
  userInfo: string;
  iat: number;
  exp: number;
}

const emptyUser: ITokenUserInfo = {
  id: 0,
  email: '',
  name: '알 수 없는 유저',
  authorities: [],
};

const useUserInfo = () => {
  const { session } = useSessionStore();

  const userInfo = () => {
    if (session == null || session.accessToken == null) {
      return emptyUser;
    }

    const payload: ITokenPayload = jwtDecode(session.accessToken);

    return JSON.parse(payload.userInfo) as ITokenUserInfo;
  };

  return { userInfo };
};

export default useUserInfo;
