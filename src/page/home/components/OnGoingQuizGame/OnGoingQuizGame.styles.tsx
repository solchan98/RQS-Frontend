import styled from 'styled-components';
import ReactTimeago from 'react-timeago';

export const OnGoingQuizGameMiddle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const OnGoingQuizGameBottom = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;

  height: 48px;
`;

export const OnGoingQuizGameProgressBarCount = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;
`;

export const OnGoingQuizGameTimeAGo = styled(ReactTimeago)`
  padding: 8px 8px 0;
  font-size: 14px;
`;
