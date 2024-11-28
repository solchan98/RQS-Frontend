import React, { useMemo } from 'react';
import { LinearProgress } from '@mui/material';
import { IProgressBarState } from './useProgressBarState';

interface ProgressBarProps {
  width?: number | string;
  progressState: IProgressBarState;
}

export const ProgressBar = ({ width = '100%', progressState }: ProgressBarProps) => {
  const progress: number = useMemo(() => (progressState.current / progressState.totalCount) * 100, [progressState]);
  const resolvedWidth = typeof width === 'number' ? `${width}px` : width;

  return (
    <div style={{ width: resolvedWidth, flexGrow: 1 }}>
      <LinearProgress color='info' variant='determinate' value={progress} style={{ borderRadius: 6, height: 12 }} />
    </div>
  );
};
