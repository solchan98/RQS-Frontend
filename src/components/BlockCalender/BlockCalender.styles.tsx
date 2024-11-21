import styled from 'styled-components';

export const BlockCalenderContainer = styled.div`
  position: relative;
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
  position: relative;
  width: 16px;
`;

export const BlockCellsColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BlockCalenderCell = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 4px;
`;

export const CellHoverContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #505050;
  color: #ffffff;
  padding: 2px;
  border-radius: 4px;
  z-index: 999;
`;

export const CellHoverText = styled.span`
  width: fit-content;
  font-size: 12px;
  padding: 4px;
  white-space: nowrap;
`;
