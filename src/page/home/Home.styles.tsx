import styled from "styled-components";

export const HomeLayout = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: #e1f4e1;
    padding: 12px;
`
export const HomeHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 4px;
`
export const HomeHeaderIcons = styled.div`
    display: flex;
    gap: 8px;
`

export const HomeContinueQuiz = styled.section`
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-radius: 14px;
    background: #ffffff;

    padding: 12px 18px;
`

export const HomeContinueQuizMiddle = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
export const HomeContinueQuizBottom = styled.div`
    display: flex;
    gap: 8px;
    justify-content: space-between;
    align-items: center;

    height: 48px;
`

export const HomeContinueQuizProgressBarCount = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: bold;
`

export const HomeInterestTopics = styled.article`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    border-radius: 14px;
    background: #ffffff;

    padding: 12px 18px;
`

export const HomeInterestTopicsLeft = styled.section`
    display: flex;
    flex-direction: column;
`

export const HomeInterestTopicsTags = styled.section`
    display: flex;
    gap: 4px;

    padding-top: 14px;
`

export const HomePastQuizPacks = styled.article`
    display: flex;
    flex-direction: column;
    gap: 8px
`

export const HomePastQuizPack = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-radius: 14px;
    background: #ffffff;

    padding: 12px 18px;
`

export const HomePastQuizPackTimeAgo = styled.span`
    font-size: 12px;
`