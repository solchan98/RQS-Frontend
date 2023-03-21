import { useMount } from 'react-use';
import { useRecoilValue } from 'recoil';
import { memberState } from 'recoil/atoms/member';
import { Link, useParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';

import { ISpace } from 'types/space';
import { useModal } from 'hooks/useModal';
import { useCheckToken } from 'hooks/useCheckToken';
import { useFetchError } from 'hooks/useFetchError';
import { getMemberSpaceList } from 'service/spaces';

import { Add } from 'assets/svgs';
import { Space } from 'components/Space';
import cs from '../memberpage.module.scss';
import { CreateSpaceModal } from './CreateSpaceModal';

export const MemberSpace = () => {
  const { memberId } = useParams();
  const { memberId: loginMemberId } = useRecoilValue(memberState);
  const { tokenChecked, checkToken } = useCheckToken();

  useMount(checkToken);

  const onFetchError = useFetchError();
  const { data, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery(
    [`#spaceList_${memberId}`],
    ({ pageParam = undefined }) => getMemberSpaceList(Number(memberId), pageParam),
    {
      getNextPageParam: (spaceListResponse: ISpace[]) =>
        spaceListResponse.length !== 0 && spaceListResponse[spaceListResponse.length - 1].memberJoinedAt,
      onError: onFetchError,
      enabled: tokenChecked,
    }
  );

  const createSpace = useModal();

  return (
    <>
      <div className={cs.contentWrapper}>
        {Number(memberId) === loginMemberId && (
          <>
            <button className={cs.addBtn} type='button' onClick={createSpace.openModal}>
              <Add />
            </button>
            <CreateSpaceModal useModal={createSpace} refetch={refetch} />
          </>
        )}
        {data?.pages.map((page) =>
          page.map((space) => (
            <Link to={`/space/${space.spaceId}`} key={`${space.spaceId}_NEWEST`}>
              <Space space={space} />
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
