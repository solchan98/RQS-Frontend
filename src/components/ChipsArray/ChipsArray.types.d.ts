export interface IChip {
  key: number | null;
  label: string;
}

export interface ChipDataProps {
  chips: IChip[];
  onDelete: (chipToDelete: IChip) => () => void;
}
