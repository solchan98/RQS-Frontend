import { Tag } from '../../../components/Tag/Tag';
import React from 'react';
import { Title } from '../../../components/Title/Title';
import { PastQuizPackTimeAgo, PastQuizPackTopicsTags } from './PastQuizPack.styles';
import { IPastQuizPack } from './PastQuizPacks.types';

interface IPastQuizPackProps {
  pastQuizPack: IPastQuizPack;
  timeAgo: number; // TBU
}

export const PastQuizPack = ({ pastQuizPack, timeAgo }: IPastQuizPackProps) => {
  return (
    <>
      <Title title={pastQuizPack.title} size={14} />
      <PastQuizPackTimeAgo>{`학습한지 ${timeAgo}일이 지났습니다.`}</PastQuizPackTimeAgo>
      <span>{`${pastQuizPack.quizCount} Quizzes`}</span>
      <span>{`${pastQuizPack.plays} Plays`}</span>
      <PastQuizPackTopicsTags>
        {pastQuizPack.tags.map((tag) => (
          <Tag key={tag} name={tag} size={12} />
        ))}
      </PastQuizPackTopicsTags>
    </>
  );
};
