import { atom } from 'recoil';
import { IMember } from 'types/member';

export const memberState = atom({
  key: '#member',
  default: { isLoggedIn: false } as IMember,
});
