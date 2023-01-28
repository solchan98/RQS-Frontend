import store from 'store';
import { baseApi } from './index';
import { IMemberResponse } from 'types/member';
import { AxiosResponse } from 'axios';

const LOGIN = '/member/login';
const GET_MEMBER_INFO = '/member/info';
const REFRESH_TOKEN = '/member/reissue';
const SIGN_UP = '/member/sign-up';
const CHECK_EMAIL_DUPLICATE = '/member/check';
const UPDATE_MEMBER_NICKNAME = '/member/nickname';

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

const getMemberInfoApi = (memberId: number) => {
  return baseApi.get(GET_MEMBER_INFO, { params: { memberId } }).then((res) => res.data);
};

export const getMemberInfo = (memberId: number) => {
  return getMemberInfoApi(memberId)
    .then((data) => data)
    .catch(() => alert('SERVER ERROR'));
};

const updateMemberNicknameApi = (nickname: string) => {
  const atk = store.get('atk');
  const data = { nickname };
  return baseApi
    .patch(UPDATE_MEMBER_NICKNAME, data, {
      headers: { Authorization: `bearer ${atk}` },
    })
    .then((res) => res.data);
};

export const updateMemberNickname = (nickname: string) => {
  return updateMemberNicknameApi(nickname)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => updateMemberNicknameApi(nickname)));
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
