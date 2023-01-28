export interface IMember {
  memberId: number;
  email: string;
  nickname: string;
  description: string;
  avatar: string;
  isLoggedIn: boolean;
}

export interface IMemberResponse {
  atk: string;
  rtk: string;
}

export interface IMemberSubject {
  memberId: number;
  email: string;
  nickname: string;
  description: string;
  avatar: string;
}
