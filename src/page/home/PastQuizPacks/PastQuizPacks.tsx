import { HomePastQuizPack } from '../index.styles';
import { PastQuizPack } from './PastQuizPack';
import React from 'react';
import { IPastQuizPack } from './PastQuizPacks.types';

const dummyPastQuizPacks: IPastQuizPack[] = [
  {
    title: '다양한 모니터링 방법',
    quizCount: 20,
    plays: 300,
    tags: ['모니터링', 'Backend', 'CI/CD', 'ELK'],
  },
  {
    title: 'Java 인터페이스 부시기',
    quizCount: 20,
    plays: 300,
    tags: ['Java'],
  },
  {
    title: 'ava Virtual Thread diff Coroutine',
    quizCount: 20,
    plays: 300,
    tags: ['Java', 'Virtual Thread', 'Coroutine'],
  },
];

export const PastQuizPacks = () => {
  return (
    <>
      {dummyPastQuizPacks.map((dummyPastQuizPack) => {
        return (
          <HomePastQuizPack key={dummyPastQuizPack.title}>
            <PastQuizPack pastQuizPack={dummyPastQuizPack} timeAgo={6} />
          </HomePastQuizPack>
        );
      })}
    </>
  );
};
