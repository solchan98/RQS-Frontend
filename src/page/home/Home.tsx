import {
    HomeHeader,
    HomeHeaderIcons,
    HomeLayout,
    HomeMainSection,
    HomeMainSectionPlayingQuiz,
    HomeMainSectionProgressBar,
    HomeMainSectionProgressBarCount,
    HomeSubSection
} from "./Home.styles";
import {Tag} from "../../components/Tag/Tag";
import {FaSearch} from "react-icons/fa";
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
            <HomeSubSection>
                <Label title='추가된 나의 관심주제 퀴즈 +2' size={12} color='#3eb33e'/>
                <Tag name='모니터링' size={14}/>
                <Title title='서버 모니터링 기술 스택 중, ELK에서 E는 어떤 기술의 약자인가요?' size={16}/>
            </HomeSubSection>
            <HomeMainSection>
                <HomeMainSectionPlayingQuiz>
                    <Label title='진행중인 퀴즈' size={12} color='#3eb33e'/>
                    <Title title='다양한 서버 모니터링 방법' size={24}/>
                    <Label title='진행한지 5시간이 지났습니다.' color='#878787' />
                    <HomeMainSectionProgressBar>
                        <HomeMainSectionProgressBarCount>2 / 10</HomeMainSectionProgressBarCount>
                        <ProgressBar currentProgress={2} totalCount={10}/>
                    </HomeMainSectionProgressBar>
                </HomeMainSectionPlayingQuiz>
            </HomeMainSection>
            <section>진행중인 퀴즈게임</section>
            <section>다시보기 추천 주제</section>
        </HomeLayout>
    );
}