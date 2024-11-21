import { useEffect, useMemo, useState } from 'react';

interface IColumnType {
  columnIndex: number;
  dates: ICellDateType[];
  showLabel: boolean;
}

interface ICellDateType {
  month: number;
  day: number;
}

interface IUseBlockCalender {
  columnsState: IColumnType[];
  getMonthName: (monthIndex: number) => string;
  getColor: (count: number) => string;
}

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
export const useBlockCalender = (startMonth: number, period: number): IUseBlockCalender => {
  const [columnsState, setColumnsState] = useState<IColumnType[]>([]);

  const resultColumns = useMemo(() => {
    const currentYear = new Date().getFullYear();
    let totalDays = 0;

    // 총 일 수 계산
    for (let i = 0; i < period; i += 1) {
      const month = ((startMonth + i - 1) % 12) + 1;
      const year = currentYear + Math.floor((startMonth + i - 1) / 12);
      totalDays += getDaysInMonth(year, month);
    }

    // 7의 배수로 맞추기
    if (totalDays % 7 !== 0) {
      totalDays += 7 - (totalDays % 7);
    }

    // 날짜 목록 생성
    const dates: ICellDateType[] = [];
    const startDate = new Date(currentYear, startMonth - 1, 1);

    for (let i = 0; i < totalDays; i += 1) {
      const newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + i);
      dates.push({
        month: newDate.getMonth() + 1,
        day: newDate.getDate(),
      });
    }

    // 열 그룹화 (7일씩 묶기)
    const columns = dates.reduce<IColumnType[]>((acc, curr, idx) => {
      const groupIndex = Math.floor(idx / 7);
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
  }, [startMonth, period]);

  useEffect(() => {
    setColumnsState(resultColumns);
  }, [resultColumns]);

  return { columnsState, getMonthName, getColor };
};
