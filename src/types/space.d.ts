export interface ISpace {
  spaceId: number;
  title: string;
  visibility: boolean;
  itemCount: number;
  spaceMemberCount: number;
  authority: string;
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISpaceMember {
  spaceMemberId: number;
  email: string;
  nickname: string;
  avatar: string;
  joinedAt: string;
  role: string;
}
