import { IoNotificationsOutline } from 'react-icons/io5';

import React, { useEffect, useState } from 'react';
import { HomeHeader, HomeHeaderIcons, HomeLayout, HomeLayoutContainer } from './index.styles';
import { NickName } from 'components/NickName/NickName';
import { Icon } from 'components/Icon/Icon';
import { OnGoingQuizGame } from './components/OnGoingQuizGame/OnGoingQuizGame';
import { BlockCalender } from '../../components/BlockCalender/BlockCalender';
import { Label } from '../../components/Label/Label';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Contributions, OnGoingGame } from '../../types/home';
import { getContributions, getOnGoingQuizGames } from '../../api/reader/quizgame';
import { useErrorRequest } from '../../hooks/useErrorRequest';
import { OnGoingQuizGameSlider } from './components/OnGoingQuizGame/OnGoingQuizGameSlider';

export const Home = () => {
  const navigate = useNavigate();
  const { setErrorState } = useErrorRequest();

  // ongoing games
  const [onGoingQuizGamesState, setOnGoingQuizGamesState] = useState<OnGoingGame[]>([]);
  useEffect(() => {
    getOnGoingQuizGames(setErrorState, () => {}).then((data) => {
      const sortedQuizGames = data.sort((a, b) => {
        return b.lastUpdatedAt.getTime() - a.lastUpdatedAt.getTime();
      });
      setOnGoingQuizGamesState(() => [...sortedQuizGames]);
    });
  }, []);

  // contributions
  const [contributionsState, setContributionsState] = useState<Contributions[]>([]);
  useEffect(() => {
    getContributions(setErrorState, () => {}).then((data) => setContributionsState(() => [...data]));
  }, []);

  return (
    <HomeLayout>
      <HomeHeader>
        <NickName name='User Name' size={24} />
        <HomeHeaderIcons>
          <Icon icon={IoNotificationsOutline} size={24} />
        </HomeHeaderIcons>
      </HomeHeader>
      {/* <AddedTopicsQuizContainer> */}
      {/*  <AddedTopicsQuiz /> */}
      {/* </AddedTopicsQuizContainer> */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}>
        <HomeLayoutContainer style={{ width: '100%' }}>
          <Button type='button' onClick={() => navigate('/new-quizzes')}>
            퀴즈 바로생성
          </Button>
        </HomeLayoutContainer>
        <HomeLayoutContainer style={{ width: '100%' }}>
          <Button type='button' onClick={() => navigate('/quiz-packs')}>
            퀴즈팩 탐색
          </Button>
        </HomeLayoutContainer>
      </div>
      <HomeLayoutContainer>
        <OnGoingQuizGameSlider>
          {onGoingQuizGamesState !== null && onGoingQuizGamesState.length > 0 ? (
            onGoingQuizGamesState.map((item) => <OnGoingQuizGame key={item.id} data={item} />)
          ) : (
            <div>현재 진행중인 게임이 없습니다.</div>
          )}
        </OnGoingQuizGameSlider>
      </HomeLayoutContainer>
      {/* <HomeLayoutContainer> */}
      {/*  <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}
      {/*    <Label title='11월 20일 수요일' /> */}
      {/*    <Icon icon={IoSettingsOutline} size={18} /> */}
      {/*  </div> */}
      {/*  <div style={{ display: 'flex', flexDirection: 'column' }}> */}
      {/*    <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}
      {/*      <div style={{ display: 'flex' }}> */}
      {/*        <Icon icon={PiPackage} size={24} /> */}
      {/*        <div style={{ display: 'flex', flexDirection: 'column' }}> */}
      {/*          <span>8건</span> */}
      {/*          <span>학습한지 7일이 지난 퀴즈팩</span> */}
      {/*        </div> */}
      {/*      </div> */}
      {/*      <button type='button'>더보기</button> */}
      {/*    </div> */}
      {/*    <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}
      {/*      <div style={{ display: 'flex' }}> */}
      {/*        <Icon icon={PiExam} size={24} /> */}
      {/*        <div style={{ display: 'flex', flexDirection: 'column' }}> */}
      {/*          <span>12건</span> */}
      {/*          <span>80점 이하 점수를 가진 퀴즈팩</span> */}
      {/*        </div> */}
      {/*      </div> */}
      {/*      <button type='button'>더보기</button> */}
      {/*    </div> */}
      {/*  </div> */}
      {/* </HomeLayoutContainer> */}
      <HomeLayoutContainer>
        <Label title='My Study Timeline' size={14} />
        <BlockCalender data={contributionsState} />
      </HomeLayoutContainer>
    </HomeLayout>
  );
};
