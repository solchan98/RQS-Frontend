import styled from 'styled-components';

export const QuizGameContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
`;

export const QuizGameProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;

  width: 80%;
  margin-top: 12px;
`;

export const QuizGameQuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50%;
  padding: 24px;
`;

export const QuizTitleContainer = styled.span`
  font-size: 28px;
  font-weight: bold;
`;

export const QuizOptionsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

export const NextQuizButtonContainer = styled.div`
  position: fixed;
  bottom: 16px;
`;
