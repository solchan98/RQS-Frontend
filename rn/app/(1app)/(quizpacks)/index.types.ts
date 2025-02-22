import { IPaginationProps } from '../../../hooks/usePagination';

export interface IQuizPack {
  quizPackId: number;
  quizPackTitle: string;
  memberCount: number;
  quizCount: number;
  createdAt: Date;
}

export interface IQuizPackCardProps {
  quizPackId: number;
  quizPackTitle: string;
  quizCount: number;
  memberCount: number;
  createdAt: Date;
}

export interface IQuizPacksProps {
  onAlert: (message: string) => void;
  toggleState: boolean;
  paginationState: IPaginationProps;
  setPaginationState: (value: React.SetStateAction<IPaginationProps>) => void;
}
