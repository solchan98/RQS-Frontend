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
import { OnGoingGame } from '../../../../types/home';

interface IOnGoingQuizGameProps {
  data: OnGoingGame;
}

export const OnGoingQuizGame = ({ data }: IOnGoingQuizGameProps) => {
  const { progressState } = useProgressBarState({ current: data.submittedQuizCount, totalCount: data.quizCount });

  return (
    <>
      <OnGoingQuizGameMiddle>
        <Title title={data.quizPackTitle} size={24} />
        <Label title={`진행한지 ${data.lastSubmittedAt}시간이 지났습니다.`} color='#878787' />
      </OnGoingQuizGameMiddle>
      <OnGoingQuizGameBottom>
        <OnGoingQuizGameProgressBarCount>{`${data.submittedQuizCount} / ${data.quizCount}`}</OnGoingQuizGameProgressBarCount>
        <ProgressBar progressState={progressState} />
        <Icon icon={FaArrowRight} size={14} color='#878787' />
      </OnGoingQuizGameBottom>
    </>
  );
};
