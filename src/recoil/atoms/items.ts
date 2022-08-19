import { IItem } from 'types/item';
import { atom } from 'recoil';

interface IItemListState {
  itemList: IItem[];
  isLast: boolean;
}

export const itemListState = atom({
  key: '#itemList',
  default: { itemList: [] as IItem[], isLast: false } as IItemListState,
});
