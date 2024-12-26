import React, { useCallback, useEffect, useState } from 'react';
import {
  QuizPacksBodyContainer,
  QuizPacksContainer,
  QuizPacksSearchContainer,
  QuizPacksTopContainer,
} from './index.styles';
import { QuizPacksTypeDropdown } from './components/QuizPacksTypeDropdown/QuizPackTypeDropdown';
import { Label } from '../../components/Label/Label';
import { QuizPacksSearchBar } from './components/QuizPacksSearchBar/QuizPacksSearchBar';
import { useInput } from '../../hooks/useInput';
import { QuizPackCard } from './components/QuizPackCard/QuizPackCard';
import { Button, Skeleton } from '@mui/material';
import { useErrorRequest } from '../../hooks/useErrorRequest';
import { IQuizPackStatus } from '../../types/quizpacks';
import { getQuizPacks } from '../../api/reader/quizpacks';
import { usePagination } from '../../hooks/usePagination';

export const QuizPacks = () => {
  const { setErrorState } = useErrorRequest();
  const { paginationState, setPaginationState } = usePagination(10);
  const [loadingState, setLoadingState] = useState<boolean>(true);

  const [quizPacksState, setQuizPacksState] = useState<IQuizPackStatus[]>([]);
  const [searchTypeState, setSearchTypeState] = useState<'MY' | 'ALL'>('MY');
  const { value: searchInputState, onChange } = useInput();

  const loadQuizPacks = useCallback(() => {
    if (paginationState.finish) {
      return;
    }

    setLoadingState(true);
    getQuizPacks(paginationState, searchTypeState, setErrorState, () => {}).then((result) => {
      const lastQuizPack = result.slice(-1)[0];
      const finish = result.length < paginationState.chunk;
      setQuizPacksState((prev) => [...prev, ...result]);
      setLoadingState(false);
      if (!lastQuizPack) {
        setPaginationState((prev) => ({ ...prev, finish }));
        return;
      }

      setPaginationState((prev) => ({ lastId: lastQuizPack.quizPackId, chunk: prev.chunk, finish }));
    });
  }, [paginationState, searchTypeState, setErrorState, setPaginationState]);

  useEffect(() => {
    loadQuizPacks();
  }, []);

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
  }, [searchTypeState]);

  const onSearch = (callback: () => void) => {
    // TODO ...
    callback();
  };

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
        {quizPacksState.map((value) => (
          <QuizPackCard
            key={value.quizPackId}
            quizPackId={value.quizPackId}
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
