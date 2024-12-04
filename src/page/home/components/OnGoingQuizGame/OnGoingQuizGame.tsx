import { Title } from '../../../../components/Title/Title';
import { Label } from '../../../../components/Label/Label';
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar';
import { Icon } from '../../../../components/Icon/Icon';
import { FaArrowRight } from 'react-icons/fa';
import React from 'react';
import {
  OnGoingQuizGameBottom,
  OnGoingQuizGameMiddle,
  OnGoingQuizGameProgressBarCount,
} from './OnGoingQuizGame.styles';
import { useProgressBarState } from '../../../../components/ProgressBar/useProgressBarState';

const dummyOnGoingQuizGame = {
  title: '다양한 서버 모니터링 방법',
  timeAgo: 5,
  pastQuizCount: 9,
  quizCount: 10,
};

export const OnGoingQuizGame = () => {
  const { progressState } = useProgressBarState({ current: 9, totalCount: dummyOnGoingQuizGame.quizCount });

  return (
    <>
      <OnGoingQuizGameMiddle>
        <Title title={dummyOnGoingQuizGame.title} size={24} />
        <Label title={`진행한지 ${dummyOnGoingQuizGame.timeAgo}시간이 지났습니다.`} color='#878787' />
      </OnGoingQuizGameMiddle>
      <OnGoingQuizGameBottom>
        <OnGoingQuizGameProgressBarCount>{`${dummyOnGoingQuizGame.pastQuizCount} / ${dummyOnGoingQuizGame.quizCount}`}</OnGoingQuizGameProgressBarCount>
        <ProgressBar progressState={progressState} />
        <Icon icon={FaArrowRight} size={14} color='#878787' />
      </OnGoingQuizGameBottom>
    </>
  );
};
