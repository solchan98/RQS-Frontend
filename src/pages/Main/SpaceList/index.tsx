import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getMySpaceList } from 'service/spaces';
import { useModal } from 'hooks/useModal';
import { memberState } from 'recoil/atoms/member';
import { ISpace } from 'types/space';
import { Space } from 'components/Space';
import { CreateSpaceModal } from 'pages/Main/SpaceList/CreateSpaceModal';

import { Add } from 'assets/svgs';
import cs from '../main.module.scss';
import scs from './spaceList.module.scss';

export const SpaceList = () => {
  const memberValue = useRecoilValue(memberState);

  const { data, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery(
    ['#spaceList'],
    ({ pageParam = undefined }) => getMySpaceList(memberValue.email, pageParam),
    {
      getNextPageParam: (spaceListResponse: ISpace[]) =>
        spaceListResponse.length !== 0 && spaceListResponse[spaceListResponse.length - 1],
    }
  );

  const createSpace = useModal();

  return (
    <>
      <div className={cs.listTop}>
        <div className={scs.spaceSubTitleWrapper}>
          <h3 className={cs.subTitle}>나의 스페이스</h3>
          <button className={scs.createSpace} type='button' onClick={createSpace.openModal}>
            <Add />
          </button>
          <CreateSpaceModal useModal={createSpace} refetch={refetch} />
        </div>
      </div>
      <ul className={cs.listContent}>
        {data?.pages.map((page) =>
          page.map((space) => (
            <li key={space.spaceId}>
              <Link to={`/space/${space.spaceId}`}>
                <Space space={space} />
              </Link>
            </li>
          ))
        )}
        {hasNextPage && (
          <button type='button' onClick={() => fetchNextPage()}>
            더보기
          </button>
        )}
      </ul>
    </>
  );
};
