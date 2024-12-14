import { useState } from 'react';
import { IUsePagination } from '../types/common/request';

export const usePagination = (chunk: number) => {
  const [paginationState, setPaginationState] = useState<IUsePagination>({ chunk, finish: false });

  return { paginationState, setPaginationState };
};
