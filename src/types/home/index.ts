export interface Contributions {
  localDate: string;
  count: number;
}

export interface OnGoingGame {
  id: string;
  quizPackTitle: string;
  submittedQuizCount: number;
  quizCount: number;
  lastUpdatedAt: Date;
}
