import { useBlockCalender } from './useBlockCalender';
import {
  BlockCalenderCell,
  BlockCalenderColumnContainer,
  BlockCalenderContainer,
  BlockCellsColumn,
  ColumnLabel,
} from './BlockCalender.styles';

const dummy = [
  { key: '11/1', count: 1 },
  { key: '11/2', count: 3 },
  { key: '11/15', count: 12 },
  { key: '11/18', count: 5 },
  { key: '2/1', count: 1 },
  { key: '2/18', count: 14 },
];

export const BlockCalender = () => {
  const { columnsState, getMonthName, getColor } = useBlockCalender(new Date().getMonth() + 1, 8);

  return (
    <BlockCalenderContainer>
      {columnsState.map((item) => {
        return (
          <BlockCalenderColumnContainer style={{ width: 16 }} key={item.columnIndex}>
            {item.showLabel ? <ColumnLabel>{getMonthName(item.dates[0].month)}</ColumnLabel> : <ColumnLabel />}
            <BlockCellsColumn key={item.columnIndex}>
              {item.dates.map((date) => (
                <BlockCalenderCell
                  style={{ background: getColor(dummy.find((v) => v.key === `${date.month}/${date.day}`)?.count ?? 0) }}
                  key={`${date.month}/${date.day}`}
                />
              ))}
            </BlockCellsColumn>
          </BlockCalenderColumnContainer>
        );
      })}
    </BlockCalenderContainer>
  );
};
