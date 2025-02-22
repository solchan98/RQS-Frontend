import { MutableRefObject } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

export type TaskStatus = 'ADDED' | 'FINISH' | 'PENDING_REVIEW' | 'WAITING_TO_BE_PUBLISHED';
export type TaskResult = 'FAIL' | 'SUCCESS' | 'WAITING';

export interface IAutoQuizPack {
  id: number;
  taskId: number;
  title: string;
  userId: number;
  quizzes: IAutoQuiz[];
}

export interface IAutoQuiz {
  id: number;
  content: string;
  options: IAutoOption[];
  description: string;
}

export interface IAutoOption {
  id: number;
  content: string;
  correct: boolean | null;
}

export interface IAddAutoCreateQuizPackResult {
  id: number;
  userId: number;
  taskStatus: TaskStatus;
  taskResult: TaskResult;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateQuizPackEditorProps {
  quizTitleState: string;
  onTitleChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  contentRef: MutableRefObject<string>;
}

export interface IAutoQuizTask {
  quizPackTitle: string;
  taskId: number;
  taskStatus: TaskStatus;
  taskResult: TaskResult;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITasksProps {
  data: IAutoQuizTask[];
  onPress: (task: IAutoQuizTask) => void;
}
