export interface IOnGoingGame {
  id: string;
  quizPackTitle: string;
  submittedQuizCount: number;
  quizCount: number;
  lastUpdatedAt: Date;
}

export interface IOnGoingQuizGameCarouselProps {
  data: IOnGoingGame[];
  emptyMessage?: string;
}

export interface IOnGoingQuizGameProps {
  data: IOnGoingGame;
}
