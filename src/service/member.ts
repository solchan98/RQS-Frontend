import { baseApi } from './index';

const LOGIN = '/member/login';
const GET_MEMBER_INFO = '/member';
const REFRESH_TOKEN = '/member/refresh';

export const login = (email: string, password: string) => {
  return baseApi.post(LOGIN, {
    email,
    password,
  });
};

export const getMemberInfo = (atk: string) => {
  return baseApi.get(GET_MEMBER_INFO, {
    headers: {
      Authorization: `bearer ${atk}`,
    },
  });
};

export const refreshToken = (memberId: string) => {
  const params = { memberId, refreshToken };
  baseApi.get(REFRESH_TOKEN, {
    params: {},
  });
};
