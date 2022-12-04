import { AxiosError } from 'axios';
import { useLogout } from 'hooks/useLogout';
import { Link, useParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getMemberSpaceList } from 'service/spaces';
import { ISpace } from 'types/space';
import { Space } from 'components/Space';
import { useModal } from 'hooks/useModal';

import { Add } from 'assets/svgs';
import cs from '../memberpage.module.scss';
import { CreateSpaceModal } from './CreateSpaceModal';
import { useRecoilValue } from 'recoil';
import { memberState } from '../../../recoil/atoms/member';

export const MemberSpace = () => {
  const { memberId } = useParams();
  const { memberId: loginMemberId } = useRecoilValue(memberState);

  const logout = useLogout();
  const { data, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery(
    [`#spaceList_${memberId}`],
    ({ pageParam = undefined }) => getMemberSpaceList(Number(memberId), pageParam),
    {
      getNextPageParam: (spaceListResponse: ISpace[]) =>
        spaceListResponse.length !== 0 && spaceListResponse[spaceListResponse.length - 1].memberJoinedAt,
      onError: (err: AxiosError<{ message: string }>) =>
        err.response?.status === 401 ? logout() : alert(err.response?.data.message),
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
