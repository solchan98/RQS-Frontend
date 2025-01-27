// @ts-ignore https://github.com/nmn/react-timeago/issues/213
import ko from 'react-timeago/lib/language-strings/ko';
// @ts-ignore https://github.com/nmn/react-timeago/issues/213
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import ReactTimeago from 'react-timeago';

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
  OnGoingQuizGameTimeAGo,
} from './OnGoingQuizGame.styles';
import { useProgressBarState } from '../../../../components/ProgressBar/useProgressBarState';
import { OnGoingGame } from '../../../../types/home';
import { useNavigate } from 'react-router-dom';

interface IOnGoingQuizGameProps {
  data: OnGoingGame;
}

const formatter = buildFormatter(ko);

export const OnGoingQuizGame = ({ data }: IOnGoingQuizGameProps) => {
  const { progressState } = useProgressBarState({ current: data.submittedQuizCount, totalCount: data.quizCount });

  const navigate = useNavigate();

  return (
    <div>
      <OnGoingQuizGameMiddle>
        <Title title={data.quizPackTitle} size={24} />
        <OnGoingQuizGameTimeAGo date={data.lastUpdatedAt} formatter={formatter} />
      </OnGoingQuizGameMiddle>
      <OnGoingQuizGameBottom>
        <OnGoingQuizGameProgressBarCount>{`${data.submittedQuizCount} / ${data.quizCount}`}</OnGoingQuizGameProgressBarCount>
        <ProgressBar progressState={progressState} />
        <Icon icon={FaArrowRight} size={14} color='#878787' onClick={() => navigate(`/game/play/${data.id}`)} />
      </OnGoingQuizGameBottom>
    </div>
  );
};
