import store from 'store';
import { baseApi } from './index';
import { IMemberResponse } from 'types/member';
import { AxiosResponse } from 'axios';

const LOGIN = '/member/login';
const GET_MEMBER_INFO = '/member';
const REFRESH_TOKEN = '/member/reissue';
const SIGN_UP = '/member/sign-up';
const CHECK_EMAIL_DUPLICATE = '/member/check';
const CHECK_IS_UPDATABLE = '/member/validate';

export const checkEmail = (email: string) => {
  return baseApi
    .get(CHECK_EMAIL_DUPLICATE, {
      params: { email },
    })
    .then((res) => res.data);
};

export const signUp = (email: string, nickname: string, password: string) => {
  const data = { email, nickname, password };
  return baseApi.post(SIGN_UP, data);
};

export const login = (email: string, password: string) => {
  return baseApi
    .post(LOGIN, {
      email,
      password,
    })
    .then((res: AxiosResponse<IMemberResponse>) => {
      store.set('atk', res.data.atk);
      store.set('rtk', res.data.rtk);
      return res.data;
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

const checkIsUpdatableApi = () => {
  const atk = store.get('atk');
  return baseApi.get(CHECK_IS_UPDATABLE, { headers: { Authorization: `bearer ${atk}` } }).then((res) => res.data);
};

export const checkIsUpdatable = () => {
  return checkIsUpdatableApi()
    .then((res) => res.data.isAccessible)
    .catch(() => reissueAtk().then(() => checkIsUpdatableApi()));
};

export const reissueAtk = () => {
  const rtk = store.get('rtk');
  return baseApi
    .get(REFRESH_TOKEN, {
      headers: {
        Authorization: `bearer ${rtk}`,
      },
    })
    .then((res) => {
      const { atk } = res.data;
      store.set('atk', atk);
    });
};
