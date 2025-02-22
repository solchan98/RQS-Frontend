import { useState } from 'react';

export interface IPaginationProps {
  lastId?: number | null;
  chunk: number;
  finish: boolean;
}

export const usePagination = (chunk: number) => {
  const [paginationState, setPaginationState] = useState<IPaginationProps>({ chunk, finish: false });

  return { paginationState, setPaginationState };
};
