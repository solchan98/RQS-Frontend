import styled from 'styled-components';

export const BlockCalenderContainer = styled.div`
  display: flex;
  gap: 4px;

  overflow-x: scroll;
`;

export const ColumnLabel = styled.div`
  height: 20px;
  font-size: 13px;

  font-weight: 500;
`;

export const BlockCalenderColumnContainer = styled.div`
  width: 16px;
`;

export const BlockCellsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BlockCalenderCell = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 4px;
`;
