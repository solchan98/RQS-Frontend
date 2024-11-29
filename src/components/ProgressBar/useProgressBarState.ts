import { useState } from 'react';

interface IUseProgressBar {
  progressState: IProgressBarState;
  previous: () => void;
  next: () => void;
  isLast: () => boolean;
}

export interface IProgressBarState {
  current: number;
  totalCount: number;
}

export const useProgressBarState = ({ current, totalCount }: IProgressBarState): IUseProgressBar => {
  const [progressState, setProgressState] = useState<IProgressBarState>({ current, totalCount });

  const next = () => {
    if (current >= totalCount) {
      return;
    }

    setProgressState((prev) => ({ current: prev.current + 1, totalCount }));
  };

  const previous = () => {
    if (current <= totalCount) {
      return;
    }

    setProgressState((prev) => ({ current: prev.current - 1, totalCount }));
  };

  const isLast = () => {
    return progressState.current >= totalCount;
  };

  return { progressState, previous, next, isLast };
};
