import {
  BlockCalenderCell,
  BlockCalenderColumnContainer,
  BlockCalenderContainer,
  BlockCellsColumn,
  CellHoverContainer,
  CellHoverText,
  ColumnLabel,
} from './BlockCalender.styles';
import React, { useEffect, useRef } from 'react';
import { ICellDateType } from './BlockCalender.types';
import { useBlockCalender } from './useBlockCalender';
import { Contributions } from '../../types/home';

interface IBlockCalenderProps {
  data: Contributions[];
}

export const BlockCalender = ({ data }: IBlockCalenderProps) => {
  const { columnsState, getMonthName, getColor, isHover, mousePositionState, onEnterCellHandler, onLeaveCellHandler } =
    useBlockCalender(6);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (scrollContainerRef.current !== null) {
        scrollContainerRef.current.scrollTo({
          left: Number.MAX_SAFE_INTEGER,
          behavior: 'smooth',
        });
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const dateToKey = (date: ICellDateType) => {
    return `${date.year}-${String(date.month).padStart(2, '0')}-${date.day}`.padStart(2, '0');
  };

  const getCountByDate = (date: ICellDateType) => {
    return data.find((v) => v.localDate === `${dateToKey(date)}`)?.count ?? 0;
  };

  const toCellDisplay = (date: ICellDateType) => {
    return `count : ${getCountByDate(date)}, ${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
  };

  return (
    <BlockCalenderContainer ref={scrollContainerRef}>
      {columnsState.map((item) => {
        return (
          <BlockCalenderColumnContainer style={{ width: 16 }} key={item.columnIndex}>
            {item.showLabel ? <ColumnLabel>{getMonthName(item.dates[0].month)}</ColumnLabel> : <ColumnLabel />}
            <BlockCellsColumn key={item.columnIndex}>
              {item.dates.map((date) => (
                <BlockCalenderCell
                  style={{
                    background: getColor(getCountByDate(date)),
                  }}
                  key={dateToKey(date)}
                  onMouseEnter={(e) => onEnterCellHandler(e, dateToKey(date))}
                  onMouseLeave={onLeaveCellHandler}
                >
                  {isHover(dateToKey(date)) ? (
                    <CellHoverContainer position={mousePositionState}>
                      <CellHoverText>{toCellDisplay(date)}</CellHoverText>
                    </CellHoverContainer>
                  ) : null}
                </BlockCalenderCell>
              ))}
            </BlockCellsColumn>
          </BlockCalenderColumnContainer>
        );
      })}
    </BlockCalenderContainer>
  );
};
