export interface IProgressBarProps {
  width?: number | string;
  progressState: IProgressBarState;
}

export interface IUseProgressBar {
  progressState: IProgressBarState;
  previous: () => void;
  next: () => void;
  isLast: () => boolean;
}

export interface IProgressBarState {
  current: number;
  totalCount: number;
}
