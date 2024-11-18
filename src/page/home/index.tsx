import {
    AddedTopicsQuizContainer,
    HomeHeader,
    HomeHeaderIcons,
    HomeLayout,
    OnGoingQuizPackContainer,
    PastQuizPacksContainer
} from "./index.styles";
import {FaSearch} from "react-icons/fa";
import {IoIosNotifications, IoMdSettings} from "react-icons/io";

import React from "react";
import {NickName} from "../../components/NickName/NickName";
import {Icon} from "../../components/Icon/Icon";
import {Label} from "../../components/Label/Label";
import {OnGoingQuizGame} from "./OnGoingQuizGame";
import {AddedTopicsQuiz} from "./AddedTopicsQuiz";
import {PastQuizPacks} from "./PastQuizPacks";

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
            <Label title='Ongoing Quiz Game' size={12} color='#3eb33e'/>
            <OnGoingQuizPackContainer>
                <OnGoingQuizGame/>
            </OnGoingQuizPackContainer>
            <Label title='New Quizzes' size={12} color='#3eb33e'/>
            <AddedTopicsQuizContainer>
                <AddedTopicsQuiz/>
            </AddedTopicsQuizContainer>
            <Label title='Past QuizPacks' size={12} color='#3eb33e'/>
            <PastQuizPacksContainer>
                <PastQuizPacks/>
            </PastQuizPacksContainer>
        </HomeLayout>
    );
}