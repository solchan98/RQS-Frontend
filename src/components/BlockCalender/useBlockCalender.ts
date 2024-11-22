import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ICellDateType, IColumnType, IMousePosition, IUseBlockCalender } from './BlockCalender.type';

const formatter = new Intl.DateTimeFormat('en-US', { month: 'short' });

/**
 * 특정 월의 일 수 계산
 */
const getDaysInMonth = (year: number, month: number): number => new Date(year, month, 0).getDate();

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

    let totalDays = 0;

    // 총 일 수 계산 (역으로 period 기간만큼)
    for (let i = 0; i < period; i += 1) {
      const month = (currentMonth - i + 12) % 12; // 역으로 계산, 0~11 범위로
      const year = currentYear - Math.floor((currentMonth - i) / 12); // 역으로 연도 계산
      totalDays += getDaysInMonth(year, month + 1); // 해당 월의 일 수 계산
    }

    // 날짜 목록 생성 (역으로 period 기간만큼)
    const dates: ICellDateType[] = [];
    const endDate = new Date(currentYear, currentMonth, currentDay); // 오늘 날짜를 끝으로
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - totalDays + 1); // 시작 날짜는 총 일 수만큼 역으로

    // 역으로 날짜 생성
    for (let i = 0; i < totalDays; i += 1) {
      const newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + i); // 시작 날짜부터 i만큼 더함
      dates.push({
        month: newDate.getMonth() + 1, // 월을 1~12로 설정
        day: newDate.getDate(),
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
  }, [period]);

  useEffect(() => {
    setColumnsState(resultColumns);
  }, [resultColumns]);

  return { columnsState, getMonthName, getColor, isHover, mousePositionState, onEnterCellHandler, onLeaveCellHandler };
};
