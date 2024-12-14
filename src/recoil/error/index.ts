import { atom } from 'recoil';

export interface IRequestError {
  key: string;
  status: number | null;
  message: string | null;
}

export const requestErrorsState = atom({
  key: 'requestErrors',
  default: {} as { [key: string]: IRequestError },
});
