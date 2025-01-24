import styled from 'styled-components';

export const PrepareQuizGameContainer = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PrepareQuizGameTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 60%;
  padding: 48px 18px 0;
`;

export const PrepareQuizGameTagsContainer = styled.div`
  display: flex;
  gap: 8px;

  padding-top: 28px;
`;

export const PrepareQuizGameQuizCount = styled.span`
  padding-top: 36px;
  font-size: 24px;
  font-weight: 500;
`;

export const PrepareQuizGameTitle = styled.div`
  width: 100%;
  font-size: 36px;
  font-weight: bold;
  overflow-wrap: break-word;
`;

export const PrepareQuizGameStartButton = styled.button`
  min-width: 120px;
  max-width: 120px;

  min-height: 48px;
  max-height: 48px;

  background: #1e90ff;
  color: #ffffff;
  border: 1px solid;
  border-radius: 12px;
  cursor: pointer;

  &:active {
    color: #2c2c2c;
  }

  &:hover {
    background: #0d81f3;
  }

  transition:
    color 0.1s,
    background 0.1s;
`;
