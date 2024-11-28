import React, { useMemo } from 'react';
import { LinearProgress } from '@mui/material';

interface ProgressBarProps {
  width?: number | string;
  currentProgress: number;
  totalCount: number;
}

export const ProgressBar = ({ width = '100%', currentProgress, totalCount }: ProgressBarProps) => {
  const progress: number = useMemo(() => (currentProgress / totalCount) * 100, [currentProgress, totalCount]);
  const resolvedWidth = typeof width === 'number' ? `${width}px` : width;

  return (
    <div style={{ width: resolvedWidth, flexGrow: 1 }}>
      <LinearProgress color='info' variant='determinate' value={progress} style={{ borderRadius: 6, height: 12 }} />
    </div>
  );
};
