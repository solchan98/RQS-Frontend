export interface IMember {
  memberId: number;
  email: string;
  nickname: string;
  avatar: string;
  isLoggedIn: boolean;
}

export interface IMemberResponse {
  memberId: number;
  email: string;
  nickname: string;
  avatar: string;
}
