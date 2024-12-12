import React, { useEffect, useState } from 'react';
import {
  QuizPacksBodyContainer,
  QuizPacksContainer,
  QuizPacksSearchContainer,
  QuizPacksTopContainer,
} from './index.styles';
import { QuizPacksTypeDropdown } from './QuizPacksTypeDropdown/QuizPackTypeDropdown';
import { Label } from '../../components/Label/Label';
import { QuizPacksSearchBar } from './QuizPacksSearchBar/QuizPacksSearchBar';
import { useInput } from '../../hooks/useInput';
import { QuizPackCard } from './QuizPackCard/QuizPackCard';
import { IGameQuiz } from '../game/Play/index.types';
import { Skeleton } from '@mui/material';

const dummy = [
  {
    title: 'JPA Core와 기초 부시기',
    memberCount: 2,
    quizCount: 10,
    tags: [
      { id: 1, name: '영속성 컨텍스트' },
      { id: 2, name: 'JPA' },
    ],
    createdAt: '2024-12-12T18:58:09.235881',
  },
  {
    title: 'Spring Boot 마스터하기',
    memberCount: 5,
    quizCount: 15,
    tags: [
      { id: 3, name: 'Spring' },
      { id: 4, name: 'Boot' },
    ],
    createdAt: '2024-12-11T14:00:00.000000',
  },
  {
    title: 'React와 Redux의 모든 것',
    memberCount: 8,
    quizCount: 20,
    tags: [
      { id: 5, name: 'React' },
      { id: 6, name: 'Redux' },
    ],
    createdAt: '2024-12-10T12:30:45.120345',
  },
  {
    title: 'Python으로 데이터 분석하기',
    memberCount: 3,
    quizCount: 25,
    tags: [
      { id: 7, name: 'Python' },
      { id: 8, name: 'Data Analysis' },
    ],
    createdAt: '2024-12-09T09:20:33.987654',
  },
  {
    title: 'Docker와 Kubernetes 기초',
    memberCount: 4,
    quizCount: 12,
    tags: [
      { id: 9, name: 'Docker' },
      { id: 10, name: 'Kubernetes' },
    ],
    createdAt: '2024-12-08T08:10:22.765432',
  },
  {
    title: 'JavaScript 심화 탐구',
    memberCount: 6,
    quizCount: 18,
    tags: [
      { id: 11, name: 'JavaScript' },
      { id: 12, name: 'ES6' },
    ],
    createdAt: '2024-12-07T07:00:11.123456',
  },
  {
    title: '알고리즘과 자료구조의 이해',
    memberCount: 10,
    quizCount: 30,
    tags: [
      { id: 13, name: 'Algorithm' },
      { id: 14, name: 'Data Structure' },
    ],
    createdAt: '2024-12-06T06:05:55.654321',
  },
  {
    title: '네트워크와 보안의 기본',
    memberCount: 7,
    quizCount: 14,
    tags: [
      { id: 15, name: 'Networking' },
      { id: 16, name: 'Security' },
    ],
    createdAt: '2024-12-05T05:15:44.876543',
  },
  {
    title: 'AI와 머신러닝 입문',
    memberCount: 9,
    quizCount: 22,
    tags: [
      { id: 17, name: 'AI' },
      { id: 18, name: 'Machine Learning' },
    ],
    createdAt: '2024-12-04T04:25:33.345678',
  },
  {
    title: '클린 코드와 리팩토링',
    memberCount: 5,
    quizCount: 16,
    tags: [
      { id: 19, name: 'Clean Code' },
      { id: 20, name: 'Refactoring' },
    ],
    createdAt: '2024-12-03T03:35:22.123987',
  },
];

export const QuizPacks = () => {
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [searchTypeState, setSearchTypeState] = useState<'MY' | 'ALL'>('MY');
  const { value: searchInputState, onChange } = useInput();

  useEffect(() => {
    setLoadingState(true);
    setTimeout(() => {
      setLoadingState(false);
    }, 1000);
  }, []);

  const onChangeSearchType = (type: 'MY' | 'ALL', callback: () => void) => {
    setSearchTypeState(type);
    callback();
  };

  const onSearch = (callback: () => void) => {
    // TODO ...
    callback();
  };

  if (loadingState) {
    return (
      <QuizPacksContainer>
        <QuizPacksTopContainer>
          <Label title='Quiz packs' size={24} />
          <QuizPacksTypeDropdown disabled searchTypeState={searchTypeState} onChangeSearchType={onChangeSearchType} />
        </QuizPacksTopContainer>
        <QuizPacksSearchContainer>
          <QuizPacksSearchBar
            disabled
            searchInputState={searchInputState}
            onChangeSearchInputState={onChange}
            onSearch={onSearch}
          />
        </QuizPacksSearchContainer>
        <QuizPacksBodyContainer>
          <Skeleton style={{ borderRadius: '18px' }} variant='rounded' height='140px' animation='wave' />
          <Skeleton style={{ borderRadius: '18px' }} variant='rounded' height='140px' animation='wave' />
          <Skeleton style={{ borderRadius: '18px' }} variant='rounded' height='140px' animation='wave' />
        </QuizPacksBodyContainer>
      </QuizPacksContainer>
    );
  }

  return (
    <QuizPacksContainer>
      <QuizPacksTopContainer>
        <Label title='Quiz packs' size={24} />
        <QuizPacksTypeDropdown
          disabled={false}
          searchTypeState={searchTypeState}
          onChangeSearchType={onChangeSearchType}
        />
      </QuizPacksTopContainer>
      <QuizPacksSearchContainer>
        <QuizPacksSearchBar
          disabled={false}
          searchInputState={searchInputState}
          onChangeSearchInputState={onChange}
          onSearch={onSearch}
        />
      </QuizPacksSearchContainer>
      <QuizPacksBodyContainer>
        {dummy.map((value) => (
          <QuizPackCard
            key={value.title}
            title={value.title}
            memberCount={value.memberCount}
            quizCount={value.quizCount}
            tags={value.tags}
            createdAt={value.createdAt}
          />
        ))}
      </QuizPacksBodyContainer>
    </QuizPacksContainer>
  );
};
