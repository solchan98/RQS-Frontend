import { IoNotificationsOutline, IoSettingsOutline } from 'react-icons/io5';
import { PiExam, PiPackage } from 'react-icons/pi';

import React from 'react';
import { AddedTopicsQuizContainer, HomeHeader, HomeHeaderIcons, HomeLayout, HomeLayoutContainer } from './index.styles';
import { NickName } from 'components/NickName/NickName';
import { Icon } from 'components/Icon/Icon';
import { OnGoingQuizGame } from './OnGoingQuizGame/OnGoingQuizGame';
import { AddedTopicsQuiz } from './AddedTopicsQuiz/AddedTopicsQuiz';
import { BlockCalender } from '../../components/BlockCalender/BlockCalender';
import { Label } from '../../components/Label/Label';

export const Home = () => {
  return (
    <HomeLayout>
      <HomeHeader>
        <NickName name='User Name' size={24} />
        <HomeHeaderIcons>
          <Icon icon={IoNotificationsOutline} size={24} />
        </HomeHeaderIcons>
      </HomeHeader>
      <AddedTopicsQuizContainer>
        <AddedTopicsQuiz />
      </AddedTopicsQuizContainer>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}>
        <HomeLayoutContainer style={{ width: '100%' }}>퀴즈 만들기</HomeLayoutContainer>
        <HomeLayoutContainer style={{ width: '100%' }}>퀴즈 탐색하기</HomeLayoutContainer>
      </div>
      <HomeLayoutContainer>
        <OnGoingQuizGame />
      </HomeLayoutContainer>
      <HomeLayoutContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Label title='11월 20일 수요일' />
          <Icon icon={IoSettingsOutline} size={18} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <Icon icon={PiPackage} size={24} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>8건</span>
                <span>학습한지 7일이 지난 퀴즈팩</span>
              </div>
            </div>
            <button type='button'>더보기</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <Icon icon={PiExam} size={24} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>12건</span>
                <span>80점 이하 점수를 가진 퀴즈팩</span>
              </div>
            </div>
            <button type='button'>더보기</button>
          </div>
        </div>
      </HomeLayoutContainer>
      <HomeLayoutContainer>
        <Label title='My Study Timeline' size={14} />
        <BlockCalender />
      </HomeLayoutContainer>
    </HomeLayout>
  );
};
