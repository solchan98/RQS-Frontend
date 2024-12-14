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
import { Alert, Skeleton } from '@mui/material';
import { useErrorRequest } from '../../hooks/useErrorRequest';
import { IQuizPack } from '../../types/quizpacks';
import { getQuizPacks } from '../../api/reader/quizpacks';
import { usePagination } from '../../hooks/usePagination';

export const QuizPacks = () => {
  const { errorsState, setErrorState } = useErrorRequest();
  const { paginationState, setPaginationState } = usePagination(20);
  const [loadingState, setLoadingState] = useState<boolean>(true);

  const [quizPacksState, setQuizPacksState] = useState<IQuizPack[]>([]);
  const [searchTypeState, setSearchTypeState] = useState<'MY' | 'ALL'>('MY');
  const { value: searchInputState, onChange } = useInput();

  useEffect(() => {
    setLoadingState(true);

    getQuizPacks(paginationState, setErrorState).then((result) => {
      setQuizPacksState(result.data ?? []);
      setPaginationState(result.pagination);
      setLoadingState(false);
    });

    getQuizPacks(paginationState, setErrorState).then((result) => {
      setQuizPacksState(result.data ?? []);
      setPaginationState(result.pagination);
      setLoadingState(false);
    });
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
      {errorsState['quiz-packs'] && <Alert severity='error'>{errorsState['quiz-packs'].message}</Alert>}
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
        {quizPacksState.map((value) => (
          <QuizPackCard
            key={value.quizPackId}
            title={value.quizPackTitle}
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
