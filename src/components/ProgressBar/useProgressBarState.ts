import { useState } from 'react';
import { IProgressBarState, IUseProgressBar } from './ProgressBar.types';

export const useProgressBarState = ({ current, totalCount }: IProgressBarState): IUseProgressBar => {
  const [progressState, setProgressState] = useState<IProgressBarState>({ current, totalCount });

  const next = () => {
    if (current >= totalCount) {
      return;
    }

    setProgressState((prev) => ({ current: prev.current + 1, totalCount: prev.totalCount }));
  };

  const previous = () => {
    if (current <= totalCount) {
      return;
    }

    setProgressState((prev) => ({ current: prev.current - 1, totalCount: prev.totalCount }));
  };

  const isLast = () => {
    return progressState.current >= progressState.totalCount;
  };

  const updateProgressState = (updateState: IProgressBarState) => {
    setProgressState(updateState);
  };

  return { progressState, updateProgressState, previous, next, isLast };
};
