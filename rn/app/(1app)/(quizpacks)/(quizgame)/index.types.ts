export interface IGameQuiz {
  gameId: string;
  quiz: IQuiz;
  quizPackId: number;
  submittedQuizCount: number;
  totalQuizCount: number;
  startedAt: Date;
  lastSubmittedAt: string | number;
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
