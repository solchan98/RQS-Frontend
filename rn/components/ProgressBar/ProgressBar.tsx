import React, { useMemo } from 'react';
import * as Progress from 'react-native-progress';
import { IProgressBarProps } from './ProgressBar.types';
import { Colors } from '../../assets/colors';

export const ProgressBar = ({ width, height, progressState, styles }: IProgressBarProps) => {
  const progress: number = useMemo(() => progressState.current / progressState.totalCount, [progressState]);

  return (
    <Progress.Bar
      style={[
        {
          borderWidth: 1,
          borderColor: 'white',
          backgroundColor: Colors.BACKGROUND1,
        },
        styles,
      ]}
      height={height}
      progress={progress}
      width={width}
    />
  );
};
