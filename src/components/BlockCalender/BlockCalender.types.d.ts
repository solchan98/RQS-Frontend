export interface IColumnType {
  columnIndex: number;
  dates: ICellDateType[];
  showLabel: boolean;
}

export interface ICellDateType {
  month: number;
  day: number;
}

export interface IUseBlockCalender {
  columnsState: IColumnType[];
  getMonthName: (monthIndex: number) => string;
  getColor: (count: number) => string;
  isHover: (cellKey: string) => boolean;
  mousePositionState: IMousePosition;
  onEnterCellHandler: (e: MouseEvent<HTMLDivElement, MouseEvent>, cellKey: string) => void;
  onLeaveCellHandler: () => void;
}

export interface IMousePosition {
  x: number;
  y: number;
}

interface ICellMousePosition {
  position: IMousePosition;
}
