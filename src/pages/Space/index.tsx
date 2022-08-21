import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { memberState } from 'recoil/atoms/member';
import { itemListState } from 'recoil/atoms/items';
import { spaceListState } from 'recoil/atoms/spaces';

import { Item } from './Item';
import { useLogout } from 'hooks/useLogout';
import { useModal } from 'hooks/useModal';
import { CreateQModal } from 'components/CreateQModal';
import { RandomQModal } from 'components/RandomQModal';
import { getSpaceItem } from 'service/items';
import { IItem } from 'types/item';

import cs from './space.module.scss';
import { NewItem, Play } from 'assets/svgs';
import EmptyData from 'assets/no_data.png';

export const Space = () => {
  const createQuestion = useModal();
  const randomQuestion = useModal();

  const logout = useLogout();

  const { spaceId } = useParams();

  const memberValue = useRecoilValue(memberState);
  const spaceListValue = useRecoilValue(spaceListState);
  const [spaceInfo, setSpaceInfo] = useState<{ spaceId: number; spaceTitle: string; myRole: string }>({
    spaceId: Number(spaceId),
    spaceTitle: '',
    myRole: 'MEMBER',
  });
  const changeSpaceInfo = (id: number) => {
    const curSpace = spaceListValue.spaceList.find((space) => space.spaceId === id);
    const curSpaceMember = curSpace?.spaceMemberList.find((spaceMember) => spaceMember.email === memberValue.email);
    setSpaceInfo((prev) => ({
      ...prev,
      spaceId: id,
      spaceTitle: curSpace?.title ?? '서버 에러',
      myRole: curSpaceMember?.role ?? 'NONE',
    }));
  };

  const [itemListValue, setItemListValue] = useRecoilState(itemListState);
  const itemListSuccessHandler = (data: IItem[]) =>
    data.length === 0
      ? setItemListValue((prev) => ({ ...prev, isLast: true }))
      : setItemListValue((prev) => ({ ...prev, itemList: [...prev.itemList, ...data] }));

  useEffect(() => {
    setItemListValue({ isLast: false, itemList: [] });
    changeSpaceInfo(Number(spaceId));
    getSpaceItem(Number(spaceId))
      .then((data) => itemListSuccessHandler(data))
      .catch((err) => {
        console.log(err);
        logout();
      });
  }, [spaceId]);

  return (
    <div className={cs.spaceContainer}>
      <div className={cs.itemTop}>{spaceInfo.spaceTitle}</div>
      <div className={cs.itemButtonWrapper}>
        <button type='button' onClick={randomQuestion.openModal}>
          <Play />
        </button>
        <RandomQModal useModal={randomQuestion} spaceId={spaceInfo.spaceId} />
        <button type='button' onClick={createQuestion.openModal}>
          <NewItem />
        </button>
        <CreateQModal useModal={createQuestion} spaceInfo={spaceInfo} />
      </div>
      {itemListValue.itemList.length === 0 && <img width='640px' src={EmptyData} alt='no-data' />}
      <ul className={cs.itemCardList}>
        {itemListValue.itemList.map((item) => (
          <li key={item.itemId} className={cs.itemCard}>
            <button type='button' onClick={() => console.log('1')}>
              <Item item={item} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
