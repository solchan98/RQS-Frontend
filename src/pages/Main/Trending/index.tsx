import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';

import { ISpace } from 'types/space';
import { getTrendingSpaceList } from 'service/spaces';
import { useLogout } from 'hooks/useLogout';
import { Space } from 'components/Space';
import cs from '../spacelist.module.scss';

export const Trending = () => {
  const logout = useLogout();
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['#spaceList_trending'],
    ({ pageParam = undefined }) => getTrendingSpaceList(pageParam),
    {
      getNextPageParam: (spaceListResponse: ISpace[]) => spaceListResponse.length !== 0 && spaceListResponse.length,
      onError: (err: AxiosError<{ message: string }>) =>
        err.response?.status === 401 ? logout() : alert(err.response?.data.message),
    }
  );

  return (
    <>
      <div className={cs.contentWrapper}>
        {data?.pages.map((page) =>
          page.map((space) => (
            <Link to={`/space/${space.spaceId}`} key={`${space.spaceId}_TRENDING`}>
              <Space space={space} pub />
            </Link>
          ))
        )}
      </div>
      <div className={cs.refetchBtnWrapper}>
        {hasNextPage && (
          <button className={cs.btn} type='button' onClick={() => fetchNextPage()}>
            더보기
          </button>
        )}
      </div>
    </>
  );
};
