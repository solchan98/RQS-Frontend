import { atom } from 'recoil';
import { IUser } from 'types/user';

export const userState = atom({
  key: '#user',
  default: { isLoggedIn: false } as IUser,
});
