import React, { useMemo } from 'react';
import { LinearProgress } from '@mui/material';
import { IProgressBarProps } from './ProgressBar.types';

export const ProgressBar = ({ width = '100%', progressState }: IProgressBarProps) => {
  const progress: number = useMemo(() => (progressState.current / progressState.totalCount) * 100, [progressState]);
  const resolvedWidth = typeof width === 'number' ? `${width}px` : width;

  return (
    <div style={{ width: resolvedWidth, flexGrow: 1 }}>
      <LinearProgress color='info' variant='determinate' value={progress} style={{ borderRadius: 6, height: 12 }} />
    </div>
  );
};
