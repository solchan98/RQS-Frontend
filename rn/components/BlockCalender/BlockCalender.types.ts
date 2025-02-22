import React from 'react';

export interface IMousePosition {
  x: number;
  y: number;
}

export interface IContributions {
  localDate: string;
  count: number;
}

export interface IBlockCalenderProps {
  data: IContributions[];
}

export interface IColumnType {
  columnIndex: number;
  dates: ICellDateType[];
  showLabel: boolean;
}

export interface ICellDateType {
  year: number;
  month: number;
  day: number;
}

export interface IUseBlockCalender {
  columnsState: IColumnType[];
  getMonthName: (monthIndex: number) => string;
  getColor: (count: number) => string;
  isHover: (cellKey: string) => boolean;
  mousePositionState: IMousePosition;
  onEnterCellHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cellKey: string) => void;
  onLeaveCellHandler: () => void;
}
