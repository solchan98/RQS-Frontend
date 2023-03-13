import { ISpaceMember } from 'space';

export interface IQuiz {
  quizId: number;
  spaceId: number;
  question: string;
  type: string;
  answer: string;
  hint: string;
  createdAt: string;
  spaceMemberResponse: ISpaceMember;
}

export interface IAnswer {
  answerId: number;
  quizId: number;
  answer: string;
  isCorrect: boolean;
}

export interface ICreateAnswer {
  answer: string;
  isCorrect: boolean;
}

export interface IQuizStatus {
  status: boolean;
  total: number;
  left: number;
  startedAt: Date;
}
