import { ISpaceMember } from 'space';

export interface IItem {
  itemId: number;
  spaceId: number;
  question: string;
  answer: string;
  hint: string;
  createdAt: Date;
  spaceMemberResponse: ISpaceMember;
}
