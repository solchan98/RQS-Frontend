import { ISpaceMember } from 'space';

export interface IQuiz {
  quizId: number;
  spaceId: number;
  question: string;
  answer: string;
  hint: string;
  createdAt: string;
  spaceMemberResponse: ISpaceMember;
}

export interface IQuizStatus {
  status: boolean;
  total: number;
  left: number;
  startedAt: Date;
}
