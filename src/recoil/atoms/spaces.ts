import { atom } from 'recoil';
import { ISpace } from 'types/space';

interface ISpaceListState {
  spaceList: ISpace[];
  isLast: boolean;
}

export const spaceListState = atom({
  key: '#spaceList',
  default: { spaceList: [] as ISpace[], isLast: false } as ISpaceListState,
});
