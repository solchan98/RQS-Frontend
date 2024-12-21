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
import { Alert, Button, Skeleton } from '@mui/material';
import { useErrorRequest } from '../../hooks/useErrorRequest';
import { IQuizPack } from '../../types/quizpacks';
import { getQuizPacks } from '../../api/reader/quizpacks';
import { usePagination } from '../../hooks/usePagination';

export const QuizPacks = () => {
  const { errorsState, setErrorState } = useErrorRequest();
  const { paginationState, setPaginationState } = usePagination(10);
  const [loadingState, setLoadingState] = useState<boolean>(true);

  const [quizPacksState, setQuizPacksState] = useState<IQuizPack[]>([]);
  const [searchTypeState, setSearchTypeState] = useState<'MY' | 'ALL'>('MY');
  const { value: searchInputState, onChange } = useInput();

  useEffect(() => {
    setLoadingState(true);
    loadQuizPacks();
  }, []);

  const loadQuizPacks = () => {
    if (paginationState.finish) {
      return;
    }

    getQuizPacks(paginationState, searchTypeState, setErrorState).then((result) => {
      const lastQuizPack = result.data.slice(-1)[0];
      const finish = result.data.length < paginationState.chunk;
      setQuizPacksState((prev) => [...prev, ...result.data]);
      setLoadingState(false);
      if (!lastQuizPack) {
        setPaginationState((prev) => ({ ...prev, finish }));
        return;
      }

      setPaginationState((prev) => ({ lastId: lastQuizPack.quizPackId, chunk: prev.chunk, finish }));
    });
  };

  const onChangeSearchType = (type: 'MY' | 'ALL', callback: () => void) => {
    setSearchTypeState(type);
    setPaginationState((prev) => ({ lastId: null, chunk: prev.chunk, finish: false }));
    setQuizPacksState([]);
    callback();
  };

  useEffect(() => {
    const stateChangeCompletionForSearch =
      searchTypeState !== null && paginationState.lastId === null && quizPacksState.length === 0;
    if (stateChangeCompletionForSearch) {
      loadQuizPacks();
    }
  }, [searchTypeState, paginationState, quizPacksState]);

  const onSearch = (callback: () => void) => {
    // TODO ...
    callback();
  };

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
        {loadingState && (
          <Skeleton style={{ borderRadius: '18px' }} variant='rounded' height='140px' animation='wave' />
        )}
      </QuizPacksBodyContainer>
      {!paginationState.finish && (
        <Button type='button' onClick={loadQuizPacks}>
          load more
        </Button>
      )}
    </QuizPacksContainer>
  );
};
