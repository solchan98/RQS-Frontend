import { ITag } from '../common/tag';

export interface IQuizPack {
  quizPackId: number;
  title: string;
  memberCount: number;
  quizCount: number;
  tags: ITag[];
  createdAt: string;
}
