import { ITag } from '../common/tag';

export interface IQuizPack {
  quizPackId: number;
  quizPackTitle: string;
  memberCount: number;
  quizCount: number;
  tags: ITag[];
  createdAt: string;
}
