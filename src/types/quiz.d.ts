import { ISpaceMember } from 'space';

export interface IQuiz {
  quizId: number;
  spaceId: number;
  childId: number;
  question: string;
  isRoot: boolean;
  type: string;
  answerResponses: IAnswer[];
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

export interface IUpdateAnswer {
  question: string;
  answers: ICreateAnswer[];
  type: string;
  hint: '';
}

export interface IQuizStatus {
  status: boolean;
  total: number;
  left: number;
  type: string;
}
