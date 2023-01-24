export interface ISpace {
  spaceId: number;
  title: string;
  content: string;
  imageUrl: string;
  visibility: boolean;
  itemCount: number;
  spaceMemberCount: number;
  authority: string;
  memberJoinedAt: string;
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

export interface IJoinSpace {
  spaceId: number;
  title: string;
  content: string;
  spaceMemberCount: number;
  itemCount: number;
  visibility: boolean;
  spaceRole: string;
}
