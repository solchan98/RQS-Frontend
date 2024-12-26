import { IOption, IQuiz } from '../../../types/quizpacks';

export interface IGameQuiz {
  gameId: string;
  quiz: IQuiz;
  quizPackId: number;
  submittedQuizCount: number;
  totalQuizCount: number;
  startedAt: string;
  lastSubmittedAt: string | number;
}
