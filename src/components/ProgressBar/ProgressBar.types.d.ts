export interface IProgressBarProps {
  width?: number | string;
  progressState: IProgressBarState;
}

export interface IUseProgressBar {
  progressState: IProgressBarState;
  updateProgressState: (progressState: IProgressBarState) => void;
  previous: () => void;
  next: () => void;
  isLast: () => boolean;
}

export interface IProgressBarState {
  current: number;
  totalCount: number;
}
