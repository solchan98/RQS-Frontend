export interface ISpace {
  spaceId: number;
  title: string;
  boolean: visibility;
  spaceMemberList: ISpaceMember[];
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
