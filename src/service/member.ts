import store from 'store';
import { baseApi } from './index';
import { IMemberResponse } from 'types/member';

const LOGIN = '/member/login';
const GET_MEMBER_INFO = '/member';
const REFRESH_TOKEN = '/member/reissue';

export const login = (email: string, password: string) => {
  return baseApi.post(LOGIN, {
    email,
    password,
  });
};

const getMemberInfoApi = () => {
  const atk = store.get('atk');
  return baseApi
    .get(GET_MEMBER_INFO, {
      headers: {
        Authorization: `bearer ${atk}`,
      },
    })
    .then((res) => res.data);
};

export const getMemberInfo = () => {
  return getMemberInfoApi()
    .then((data: IMemberResponse) => data)
    .catch(() => reissueAtk().then(() => getMemberInfoApi()));
};

export const reissueAtk = () => {
  const rtk = store.get('rtk');
  return baseApi
    .get(REFRESH_TOKEN, {
      headers: {
        Authorization: `bearer ${rtk}`,
      },
    })
    .then((res) => store.set('atk', res.data.atk));
};
