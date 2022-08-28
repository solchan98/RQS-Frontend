import { AxiosError } from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getSpace } from 'service/spaces';
import { getSpaceItem } from 'service/items';
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
  const nav = useNavigate();

  const randomQuiz = useModal();
  const createQuiz = useModal();

  const logout = useLogout();
  const { data: space } = useQuery([`#space_${spaceId}`], () => getSpace(Number(spaceId)), {
    select: (data): ISpace => data,
    onError: (err: AxiosError<{ message: string }>) =>
      err.response?.status === 401 ? logout : alert(err.response?.data.message),
  });

  const {
    data: itemList,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(
    [`#itemList_${spaceId}`],
    ({ pageParam = undefined }) => getSpaceItem(Number(spaceId), pageParam),
    {
      getNextPageParam: (itemListResponse: IItem[]) =>
        itemListResponse.length !== 0 && itemListResponse[itemListResponse.length - 1].itemId,
      onError: (err: AxiosError<{ message: string }>) =>
        err.response?.status === 401 ? logout : alert(err.response?.data.message),
    }
  );

  return (
    <div className={cs.container}>
      <div className={cs.top}>
        <div className={cs.title}>{space?.title}</div>
        <Link className={cs.setting} to='./setting'>
          <Setting />
        </Link>
      </div>
      <main className={cs.main}>
        <div className={cs.mainTop}>
          <div className={cs.infoWrapper}>
            <h3 className={cs.subTitle}>퀴즈 리스트</h3>
            <button className={cs.createQuiz} type='button' onClick={createQuiz.openModal}>
              <Add />
            </button>
            {space && <CreateQModal useModal={createQuiz} space={space} refetch={refetch} />}
          </div>
          <button className={cs.playButton} type='button' onClick={randomQuiz.openModal}>
            <Play />
          </button>
          {space && <RandomQModal useModal={randomQuiz} space={space} />}
        </div>
        {itemList?.pages[0].length === 0 && <EmptyLottie />}
        <ul className={cs.quizList}>
          {itemList?.pages.map((page) =>
            page.map((item) => (
              <li key={item.itemId}>
                <Item item={item} />
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
