import {
    HomeContinueQuiz,
    HomeContinueQuizBottom,
    HomeContinueQuizMiddle,
    HomeContinueQuizProgressBarCount,
    HomeHeader,
    HomeHeaderIcons,
    HomeInterestTopics,
    HomeInterestTopicsLeft,
    HomeInterestTopicsTags,
    HomeLayout,
    HomePastQuizPack,
    HomePastQuizPacks,
    HomePastQuizPackTimeAgo
} from "./Home.styles";
import {Tag} from "../../components/Tag/Tag";
import {FaArrowRight, FaSearch} from "react-icons/fa";
import {IoIosNotifications, IoMdSettings} from "react-icons/io";

import React from "react";
import {NickName} from "../../components/NickName/NickName";
import {Icon} from "../../components/Icon/Icon";
import {Label} from "../../components/Label/Label";
import {Title} from "../../components/Title/Title";
import {ProgressBar} from "../../components/ProgressBar/ProgressBar";

export const Home = () => {
    return (
        <HomeLayout>
            <HomeHeader>
                <NickName name='User Name' size={24}/>
                <HomeHeaderIcons>
                    <Icon icon={FaSearch} size={24}/>
                    <Icon icon={IoIosNotifications} size={24}/>
                    <Icon icon={IoMdSettings} size={24}/>
                </HomeHeaderIcons>

            </HomeHeader>
            <Label title='Continue Quiz' size={12} color='#3eb33e'/>
            <HomeContinueQuiz>
                <HomeContinueQuizMiddle>
                    <Title title='다양한 서버 모니터링 방법' size={24}/>
                    <Label title='진행한지 5시간이 지났습니다.' color='#878787'/>
                </HomeContinueQuizMiddle>
                <HomeContinueQuizBottom>
                    <HomeContinueQuizProgressBarCount>2 / 10</HomeContinueQuizProgressBarCount>
                    <ProgressBar currentProgress={2} totalCount={10}/>
                    <Icon icon={FaArrowRight} size={14} color='#878787'/>
                </HomeContinueQuizBottom>
            </HomeContinueQuiz>
            <Label title='New Quizzes' size={12} color='#3eb33e'/>
            <HomeInterestTopics>
                <HomeInterestTopicsLeft>
                    <Title title={`관심주제 퀴즈 ${4}개가 추가되었어요!`} size={14}/>
                    <Label title={`새로 추가된 퀴즈를 확인해보세요.`} size={12}/>
                    <HomeInterestTopicsTags>
                        <Tag name='모니터링' size={12}/>
                        <Tag name='Backend' size={12}/>
                        <Tag name='CI/CD' size={12}/>
                        <Tag name='ELK' size={12}/>
                    </HomeInterestTopicsTags>
                </HomeInterestTopicsLeft>
                <Icon icon={FaArrowRight} size={14} color='#878787'/>
            </HomeInterestTopics>
            <Label title='Past QuizPacks' size={12} color='#3eb33e'/>
            <HomePastQuizPacks>
                <HomePastQuizPack>
                    <Title title='다양한 모니터링 방법' size={14}/>
                    <HomePastQuizPackTimeAgo>학습한지 6일이 지났습니다.</HomePastQuizPackTimeAgo>
                    <span>20 Quizzes</span>
                    <span>300 Plays</span>
                    <HomeInterestTopicsTags>
                        <Tag name='모니터링' size={12}/>
                        <Tag name='Backend' size={12}/>
                        <Tag name='CI/CD' size={12}/>
                        <Tag name='ELK' size={12}/>
                    </HomeInterestTopicsTags>
                </HomePastQuizPack>
                <HomePastQuizPack>
                    <Title title='Java 인터페이스 부시기' size={14}/>
                    <HomePastQuizPackTimeAgo>학습한지 6일이 지났습니다.</HomePastQuizPackTimeAgo>
                    <span>20 Quizzes</span>
                    <span>300 Plays</span>
                    <HomeInterestTopicsTags>
                        <Tag name='Java' size={12}/>
                    </HomeInterestTopicsTags>
                </HomePastQuizPack>
                <HomePastQuizPack>
                    <Title title='Java Virtual Thread diff Coroutine' size={14}/>
                    <HomePastQuizPackTimeAgo>학습한지 6일이 지났습니다.</HomePastQuizPackTimeAgo>
                    <span>20 Quizzes</span>
                    <span>300 Plays</span>
                    <HomeInterestTopicsTags>
                        <Tag name='Java' size={12}/>
                        <Tag name='Virtual Thread' size={12}/>
                        <Tag name='Coroutine' size={12}/>
                    </HomeInterestTopicsTags>
                </HomePastQuizPack>
            </HomePastQuizPacks>
        </HomeLayout>
    );
}