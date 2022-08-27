import { atom } from 'recoil';
import { ISpace } from 'types/space';

export const spaceListState = atom({
  key: '#spaceList',
  default: [] as ISpace[],
});
