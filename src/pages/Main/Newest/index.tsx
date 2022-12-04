import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useLogout } from 'hooks/useLogout';
import { getNewestSpaceList } from 'service/spaces';
import { ISpace } from 'types/space';
import cs from '../spacelist.module.scss';
import { Space } from 'components/Space';

export const Newest = () => {
  const logout = useLogout();
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['#spaceList_newest'],
    ({ pageParam = undefined }) => getNewestSpaceList(pageParam),
    {
      getNextPageParam: (spaceListResponse: ISpace[]) =>
        spaceListResponse.length !== 0 && spaceListResponse[spaceListResponse.length - 1].createdAt,
      onError: (err: AxiosError<{ message: string }>) =>
        err.response?.status === 401 ? logout() : alert(err.response?.data.message),
    }
  );

  return (
    <>
      <div className={cs.contentWrapper}>
        {data?.pages.map((page) =>
          page.map((space) => (
            <Link to={`/space/${space.spaceId}`} key={`${space.spaceId}_NEWEST`}>
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
