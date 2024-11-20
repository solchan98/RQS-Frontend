import styled from 'styled-components';

export const HomeLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 66px 12px 12px;
  height: 100%;
`;

export const HomeLayoutContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 14px;
  background: #ffffff;

  padding: 12px 18px;
`;

export const HomeHeader = styled.header`
  position: fixed;
  background: #ededed;
  z-index: 999;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  height: 54px;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
`;

export const HomeHeaderIcons = styled.div`
  display: flex;
  gap: 8px;
`;

export const AddedTopicsQuizContainer = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-radius: 14px;
  background: #ffffff;

  padding: 12px 18px;
`;

export const HomePastQuizPack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 14px;
  background: #ededed;

  padding: 12px 18px;
`;
