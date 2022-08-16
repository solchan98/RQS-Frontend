import { baseApi } from './index';

const LOGIN = '/member/login';

export const login = (email: string, password: string) => {
  return baseApi.post(LOGIN, {
    email,
    password,
  });
};
