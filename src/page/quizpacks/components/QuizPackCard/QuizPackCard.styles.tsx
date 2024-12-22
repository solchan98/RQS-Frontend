import styled from 'styled-components';

export const QuizPackCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #e5e6e6;

  padding: 12px;

  border-radius: 12px;
`;

export const QuizPackCardTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const QuizPackCardTags = styled.div`
  display: flex;
  gap: 8px;

  padding-top: 8px;
`;

export const QuizPackCardTag = styled.span`
  font-size: 12px;
  font-weight: bold;
`;

export const QuizPackCardCountContainer = styled.div`
  display: flex;
  gap: 12px;

  padding-top: 18px;
`;

export const QuizPackCardCount = styled.span`
  display: flex;
  gap: 2px;
  justify-content: center;
  align-items: center;

  font-size: 16px;
`;

export const QuizPackBottomContainer = styled.div`
  display: flex;
  justify-content: end;

  font-size: 12px;
  font-weight: 500;
`;
