import { Title } from '../../../components/Title/Title';
import { Label } from '../../../components/Label/Label';
import { ProgressBar } from '../../../components/ProgressBar/ProgressBar';
import { Icon } from '../../../components/Icon/Icon';
import { FaArrowRight } from 'react-icons/fa';
import React from 'react';
import { OnGoingQuizGameBottom, OnGoingQuizGameMiddle, OnGoingQuizGameProgressBarCount } from './index.styles';

const dummyOnGoingQuizGame = {
  title: '다양한 서버 모니터링 방법',
  timeAgo: 5,
  pastQuizCount: 9,
  quizCount: 10,
};

export const OnGoingQuizGame = () => {
  return (
    <>
      <OnGoingQuizGameMiddle>
        <Title title={dummyOnGoingQuizGame.title} size={24} />
        <Label title={`진행한지 ${dummyOnGoingQuizGame.timeAgo}시간이 지났습니다.`} color='#878787' />
      </OnGoingQuizGameMiddle>
      <OnGoingQuizGameBottom>
        <OnGoingQuizGameProgressBarCount>{`${dummyOnGoingQuizGame.pastQuizCount} / ${dummyOnGoingQuizGame.quizCount}`}</OnGoingQuizGameProgressBarCount>
        <ProgressBar currentProgress={dummyOnGoingQuizGame.pastQuizCount} totalCount={dummyOnGoingQuizGame.quizCount} />
        <Icon icon={FaArrowRight} size={14} color='#878787' />
      </OnGoingQuizGameBottom>
    </>
  );
};
