import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export interface IProgressBar {
  current: number;
  totalCount: number;
}

export interface IProgressBarProps {
  width: number | null;
  height?: number;
  progressState: IProgressBar;
  styles?: ViewStyle;
}

export interface IUseProgressBar {
  progressState: IProgressBar;
  updateProgressState: (progressState: IProgressBar) => void;
  previous: () => void;
  next: () => void;
  isLast: () => boolean;
}
