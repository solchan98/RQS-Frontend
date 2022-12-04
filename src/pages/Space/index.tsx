import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { memberState } from 'recoil/atoms/member';
import { getSpace } from 'service/spaces';
import { getSpaceItemList } from 'service/items';
import { useModal } from 'hooks/useModal';
import { useLogout } from 'hooks/useLogout';
import { IItem } from 'types/item';
import { ISpace } from 'types/space';

import { Item } from './Item';
import { RandomQModal } from 'pages/Space/RandomQModal';
import { EmptyLottie } from 'components/Lotties/EmptyLottie';
import { Add, Play, Setting } from 'assets/svgs';
import cs from './space.module.scss';
import { CreateQModal } from './CreateQModal';

export const Space = () => {
  const { spaceId } = useParams();

  const randomQuiz = useModal();
  const createQuiz = useModal();

  const nav = useNavigate();
  const logout = useLogout();
  const onErrorGetSpace = (err: AxiosError<{ message: string }>) => {
    if (err.response?.status === 401) {
      logout();
    } else {
      nav(-1);
      alert(err.response?.data.message);
    }
  };
  const { data: space } = useQuery([`#space_${spaceId}`], () => getSpace(Number(spaceId)), {
    select: (data): ISpace => data,
    onError: (err: AxiosError<{ message: string }>) => onErrorGetSpace(err),
  });

  const {
    data: itemList,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(
    [`#itemList_${spaceId}`],
    ({ pageParam = undefined }) => getSpaceItemList(Number(spaceId), pageParam),
    {
      getNextPageParam: (itemListResponse: IItem[]) =>
        itemListResponse.length !== 0 && itemListResponse[itemListResponse.length - 1].itemId,
      onError: (err: AxiosError<{ message: string }>) =>
        err.response?.status === 401 ? logout() : alert(err.response?.data.message),
    }
  );

  const { isLoggedIn, email } = useRecoilValue(memberState);
  const onRandomQModalHandler = () => {
    if (isLoggedIn) {
      randomQuiz.openModal();
    } else {
      alert('로그인이 필요합니다.');
    }
  };
  const isSpaceAdmin = () => space?.authority === 'ADMIN';
  const isSpaceMember = () => space?.authority === 'ADMIN' || space?.authority === 'MEMBER';

  return (
    <div className={cs.container}>
      <div className={cs.top}>
        <div className={cs.title}>{space?.title}</div>
        {isSpaceAdmin() && (
          <Link className={cs.setting} to='./setting'>
            <Setting />
          </Link>
        )}
      </div>
      <main className={cs.main}>
        <div className={cs.mainTop}>
          <div className={cs.infoWrapper}>
            <h3 className={cs.subTitle}>퀴즈 리스트</h3>
            {isSpaceMember() && (
              <button className={cs.createQuiz} type='button' onClick={createQuiz.openModal}>
                <Add />
              </button>
            )}
            {space && <CreateQModal useModal={createQuiz} space={space} refetch={refetch} />}
          </div>
          <button className={cs.playButton} type='button' onClick={onRandomQModalHandler}>
            <Play />
          </button>
          {space && <RandomQModal useModal={randomQuiz} space={space} />}
        </div>
        {itemList?.pages[0].length === 0 && <EmptyLottie />}
        <ul className={cs.quizList}>
          {itemList?.pages.map((page) =>
            page.map((item) => (
              <li key={item.itemId}>
                <Item item={item} isUpdatable={email === item.spaceMemberResponse.email} />
              </li>
            ))
          )}
        </ul>
        {hasNextPage && (
          <div className={cs.showMoreWrapper}>
            <button type='button' onClick={() => fetchNextPage()}>
              더보기
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
