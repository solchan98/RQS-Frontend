import { Link, useNavigate, useParams } from 'react-router-dom';

import { IItem } from 'types/item';
import { ISpace, ISpaceMember } from 'types/space';

import { Item } from './Item';
import { Add, Play, Setting } from 'assets/svgs';
import cs from './space.module.scss';

const TEMP_SPACE = {
  spaceId: 1,
  title: '백엔드 면접 질문 리스트',
  visibility: false,
  spaceMemberList: [] as ISpaceMember[],
  createdAt: '2022-08-18',
  updatedAt: '2022-08-18',
} as ISpace;

const ITEM_LIST: IItem[] = [
  {
    itemId: 1,
    spaceId: 1,
    question: 'HTTP와 HTTPS의 차이에 대해 설명해주세요',
    answer: 'dd',
    hint: 'a,b',
    createdAt: '2022-08-18',
    spaceMemberResponse: { nickname: 'sol', email: 'sol@sol.com' },
  },
];

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

  return (
    <div className={cs.container}>
      <div className={cs.top}>
        <div className={cs.title}>{TEMP_SPACE.title}</div>
        <Link className={cs.setting} to='#'>
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
          <button className={cs.playButton} type='button'>
            <Play />
          </button>
        </div>
        <ul className={cs.quizList}>
          <li>
            <Item item={ITEM_LIST[0]} />
          </li>
          <li>
            <Item item={ITEM_LIST[0]} />
          </li>
          <li>
            <Item item={ITEM_LIST[0]} />
          </li>
          <li>
            <Item item={ITEM_LIST[0]} />
          </li>
          <li>
            <Item item={ITEM_LIST[0]} />
          </li>
          <li>
            <Item item={ITEM_LIST[0]} />
          </li>
          <li>
            <Item item={ITEM_LIST[0]} />
          </li>
          <li>
            <Item item={ITEM_LIST[0]} />
          </li>
        </ul>
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
