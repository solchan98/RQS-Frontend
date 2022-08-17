import { useSetRecoilState } from 'recoil';
import store from 'store';

import { memberState } from 'recoil/atoms/member';
import { IMember } from 'types/member';

export const useLogout = () => {
  const setMember = useSetRecoilState(memberState);

  return () => {
    store.remove('atk');
    store.remove('rtk');
    setMember({ isLoggedIn: false } as IMember);
  };
};
