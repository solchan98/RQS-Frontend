import styled from "styled-components";

export const HomeLayout = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: #f3f5ff;
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

export const OnGoingQuizPackContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-radius: 14px;
    background: #ffffff;

    padding: 12px 18px;
`

export const AddedTopicsQuizContainer = styled.article`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    border-radius: 14px;
    background: #ffffff;

    padding: 12px 18px;
`
export const PastQuizPacksContainer = styled.article`
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
