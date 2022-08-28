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
import { RandomQModal } from 'components/RandomQModal';
import { EmptyLottie } from 'components/Lotties/EmptyLottie';
import { Add, Play, Setting } from 'assets/svgs';
import cs from './space.module.scss';

export const Space = () => {
  const { spaceId } = useParams();
  const nav = useNavigate();

  // const createQuestion = useModal();
  // const randomQuestion = useModal();
  //
  // const logout = useLogout();
  //
  // const { spaceId } = useParams();
  //
  // const memberValue = useRecoilValue(memberState);
  // const spaceListValue = useRecoilValue(spaceListState);
  // const [spaceInfo, setSpaceInfo] = useState<{ spaceId: number; spaceTitle: string; myRole: string }>({
  //   spaceId: Number(spaceId),
  //   spaceTitle: '',
  //   myRole: 'MEMBER',
  // });
  // const changeSpaceInfo = (id: number) => {
  //   const curSpace = spaceListValue.spaceList.find((space) => space.spaceId === id);
  //   const curSpaceMember = curSpace?.spaceMemberList.find((spaceMember) => spaceMember.email === memberValue.email);
  //   setSpaceInfo((prev) => ({
  //     ...prev,
  //     spaceId: id,
  //     spaceTitle: curSpace?.title ?? '서버 에러',
  //     myRole: curSpaceMember?.role ?? 'NONE',
  //   }));
  // };
  //
  // const [itemListValue, setItemListValue] = useRecoilState(itemListState);
  // const itemListSuccessHandler = (data: IItem[]) =>
  //   data.length === 0
  //     ? setItemListValue((prev) => ({ ...prev, isLast: true }))
  //     : setItemListValue((prev) => ({ ...prev, itemList: [...prev.itemList, ...data] }));
  //
  // useEffect(() => {
  //   setItemListValue({ isLast: false, itemList: [] });
  //   changeSpaceInfo(Number(spaceId));
  //   getSpaceItem(Number(spaceId))
  //     .then((data) => itemListSuccessHandler(data))
  //     .catch((err) => {
  //       if (err.status === 401) logout();
  //       alert(err.response?.data.message ?? 'SERVER ERROR');
  //     });
  // }, [spaceId]);

  const randomQuiz = useModal();

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
            <button className={cs.createQuiz} type='button'>
              <Add />
            </button>
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
      {/* <div className={cs.itemTop}> */}
      {/*  <span>{spaceInfo.spaceTitle}</span> */}
      {/*  {spaceInfo.myRole === 'ADMIN' && ( */}
      {/*    <Link className={cs.setting} to='./setting'> */}
      {/*      <Setting /> */}
      {/*    </Link> */}
      {/*  )} */}
      {/* </div> */}
      {/* <div className={cs.itemButtonWrapper}> */}
      {/*  <button type='button' onClick={randomQuestion.openModal}> */}
      {/*    <Play /> */}
      {/*  </button> */}
      {/*  <RandomQModal useModal={randomQuestion} spaceInfo={spaceInfo} /> */}
      {/*  <button type='button' onClick={createQuestion.openModal}> */}
      {/*    <NewItem /> */}
      {/*  </button> */}
      {/*  <CreateQModal useModal={createQuestion} spaceInfo={spaceInfo} /> */}
      {/* </div> */}
      {/* {itemListValue.itemList.length === 0 && <EmptyLottie />} */}
      {/* <ul className={cs.itemCardList}> */}
      {/*  {itemListValue.itemList.map((item) => ( */}
      {/*    <li key={item.itemId} className={cs.itemCard}> */}
      {/*      <Item item={item} /> */}
      {/*    </li> */}
      {/*  ))} */}
      {/* </ul> */}
    </div>
  );
};
