import { IUsePagination } from '../request';

export interface PaginationData<T> {
  data: T;
  pagination: IUsePagination;
}
