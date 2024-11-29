export interface IOption {
  id: number;
  content: string;
}

export interface IQuizOptionProps {
  option: IOption;
  onClickOption: (answerId: number, callback: () => void) => void;
}

export interface IQuizOptionStyles {
  selected: boolean;
}

export interface IUseSubmitOption {
  submitOptions: Set<number>;
  onClickOption: (answerId: number, callback: () => void) => void;
  clearSubmitOption: () => void;
}
