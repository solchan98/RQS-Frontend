import { ITag } from '../common/tag';

export interface IQuizPackStatus {
  quizPackId: number;
  quizPackTitle: string;
  memberCount: number;
  quizCount: number;
  tags: ITag[];
  createdAt: string;
}

export interface IQuizPackDetail {
  quizPackId: number;
  quizPackTitle: string;
  quizPackMembers: IQuizPackMember[];
  quizzes: IQuiz[];
  tags: ITag[];
}

export interface IQuizPackMember {
  memberId: number;
  quizPackMemberId: number;
  role: string;
}

export interface IQuiz {
  quizId: number;
  content: string;
  creator: IQuizPackMember;
  options: IOption[];
}

export interface IOption {
  optionId: number;
  content: string;
}
