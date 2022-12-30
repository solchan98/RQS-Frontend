import { ISpaceMember } from 'space';

export interface IItem {
  itemId: number;
  spaceId: number;
  question: string;
  answer: string;
  hint: string;
  createdAt: string;
  spaceMemberResponse: ISpaceMember;
}

export interface IRandomItem {
  remainingWordCnt: number;
  remainingExpireTime: number;
  itemResponse: IItem;
}
