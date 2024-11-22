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
import { ICellDateType } from './BlockCalender.type';
import { useBlockCalender } from './useBlockCalender';

const dummy = [
  { key: '11/1', count: 1 },
  { key: '11/2', count: 3 },
  { key: '11/15', count: 12 },
  { key: '11/18', count: 5 },
  { key: '9/18', count: 14 },
  { key: '10/1', count: 1 },
];

export const BlockCalender = () => {
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
    return `${date.month}/${date.day}`;
  };

  const getCountByDate = (date: ICellDateType) => {
    return dummy.find((v) => v.key === `${date.month}/${date.day}`)?.count ?? 0;
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
                  key={`${date.month}/${date.day}`}
                  onMouseEnter={(e) => onEnterCellHandler(e, dateToKey(date))}
                  onMouseLeave={onLeaveCellHandler}
                >
                  {isHover(dateToKey(date)) ? (
                    <CellHoverContainer position={mousePositionState}>
                      <CellHoverText>{`count : ${getCountByDate(date)}, ${date.month}/${date.day}`}</CellHoverText>
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
