import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ISpace } from 'types/space';

import { getAsideMySpaceList } from 'service/spaces';
import { useRecoilValue } from 'recoil';
import { memberState } from 'recoil/atoms/member';

import { Add } from 'assets/svgs';
import { Space } from 'components/Space';
import cs from '../main.module.scss';
import scs from './spaceList.module.scss';

export const SpaceList = () => {
  const memberValue = useRecoilValue(memberState);

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['#spaceList'],
    ({ pageParam = undefined }) => getAsideMySpaceList(memberValue.email, pageParam),
    {
      getNextPageParam: (spaceListResponse: ISpace[]) =>
        spaceListResponse.length !== 0 && spaceListResponse[spaceListResponse.length - 1],
    }
  );

  return (
    <>
      <div className={cs.listTop}>
        <div className={scs.spaceSubTitleWrapper}>
          <h3 className={cs.subTitle}>나의 스페이스</h3>
          <button className={scs.createSpace} type='button'>
            <Add />
          </button>
        </div>
      </div>
      <ul className={cs.listContent}>
        {data?.pages.map((group: ISpace[]) =>
          group.map((space) => (
            <li key={space.spaceId}>
              <Link to='#'>
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
