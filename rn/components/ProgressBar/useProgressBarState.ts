import { useState } from 'react';
import { IProgressBar, IUseProgressBar } from './ProgressBar.types';

export const useProgressBarState = ({ current, totalCount }: IProgressBar): IUseProgressBar => {
  const [progressState, setProgressState] = useState<IProgressBar>({ current, totalCount });

  const next = () => {
    if (progressState.current >= progressState.totalCount) {
      return;
    }

    setProgressState((prev) => ({ current: prev.current + 1, totalCount: prev.totalCount }));
  };

  const previous = () => {
    if (progressState.current <= progressState.totalCount) {
      return;
    }

    setProgressState((prev) => ({ current: prev.current - 1, totalCount: prev.totalCount }));
  };

  const isLast = () => progressState.current >= progressState.totalCount;

  const updateProgressState = (updateState: IProgressBar) => {
    setProgressState(updateState);
  };

  return { progressState, updateProgressState, previous, next, isLast };
};
