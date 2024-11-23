import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ICellDateType, IColumnType, IMousePosition, IUseBlockCalender } from './BlockCalender.type';

const formatter = new Intl.DateTimeFormat('en-US', { month: 'short' });

/**
 * 월 이름 반환
 */
const getMonthName = (monthIndex: number): string =>
  formatter.format(new Date(new Date().getFullYear(), monthIndex - 1));

/**
 * Count값에 따른 컬러 반환
 */
const getColor = (count: number): string => {
  if (count < 1) {
    return '#ededed';
  }
  if (count < 3) {
    return '#99e199';
  }
  if (count < 5) {
    return '#80e180';
  }
  return '#70ea70';
};

/**
 * Hook: BlockCalender
 */
export const useBlockCalender = (period: number): IUseBlockCalender => {
  const [columnsState, setColumnsState] = useState<IColumnType[]>([]);
  const [hoverCellState, setHoverCellState] = useState<string>('');
  const [mousePositionState, setMousePositionState] = useState<IMousePosition>({ x: 0, y: 0 });

  const isHover = useCallback(
    (cellKey: string) => {
      return hoverCellState === cellKey;
    },
    [hoverCellState],
  );
  const onLeaveCellHandler = useCallback(() => {
    setHoverCellState('');
  }, []);

  const onEnterCellHandler = useCallback((event: React.MouseEvent<HTMLDivElement>, cellKey: string) => {
    setMousePositionState((prev) => ({
      ...prev,
      x: event.clientX,
      y: event.clientY,
    }));
    setHoverCellState(cellKey);
  }, []);

  const resultColumns = useMemo(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0부터 시작하는 월 (0 = Jan, 1 = Feb, ...)
    const currentDay = currentDate.getDate();

    // 날짜 목록 생성 (6개월 전 월의 1일부터 오늘까지)
    const dates: ICellDateType[] = [];
    const endDate = new Date(currentYear, currentMonth, currentDay); // 오늘 날짜
    const startDate = new Date(endDate); // 6개월 전의 1일로 초기화
    startDate.setMonth(startDate.getMonth() - 6); // 6개월 전으로 설정
    startDate.setDate(1); // 6개월 전 해당 월의 1일로 설정

    // 시작 날짜부터 종료 날짜까지 반복
    for (
      const date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1) // 하루씩 증가
    ) {
      dates.push({
        month: date.getMonth() + 1, // 월을 1~12로 설정
        day: date.getDate(),
      });
    }

    // 열 그룹화 (7일씩 묶기)
    const columns = dates.reduce<IColumnType[]>((acc, curr, idx) => {
      const groupIndex = Math.floor(idx / 7); // 7개씩 묶는 그룹 인덱스
      if (!acc[groupIndex]) {
        acc[groupIndex] = { columnIndex: groupIndex + 1, dates: [], showLabel: false };
      }
      acc[groupIndex].dates.push(curr);
      return acc;
    }, []);

    // 열에 `showLabel` 설정
    const shownLabels: Set<number> = new Set();

    columns.forEach((column) => {
      const uniqueMonths = new Set(column.dates.map((date) => date.month));
      if (uniqueMonths.size === 1) {
        const { month } = column.dates[0];
        if (!shownLabels.has(month)) {
          column.showLabel = true;
          shownLabels.add(month);
        }
      }
    });

    return columns;
  }, []);

  useEffect(() => {
    setColumnsState(resultColumns);
  }, [resultColumns]);

  return { columnsState, getMonthName, getColor, isHover, mousePositionState, onEnterCellHandler, onLeaveCellHandler };
};
