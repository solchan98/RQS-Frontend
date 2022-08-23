import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { memberState } from 'recoil/atoms/member';
import { itemListState } from 'recoil/atoms/items';
import { spaceListState } from 'recoil/atoms/spaces';
import { getSpaceItem } from 'service/items';

import { Item } from './Item';
import { useLogout } from 'hooks/useLogout';
import { useModal } from 'hooks/useModal';
import { CreateQModal } from 'components/CreateQModal';
import { RandomQModal } from 'components/RandomQModal';
import { IItem } from 'types/item';

import { NewItem, Play, Setting } from 'assets/svgs';
import { EmptyLottie } from 'components/Lotties/EmptyLottie';
import cs from './space.module.scss';

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
        if (err.status === 401) logout();
        alert(err.response?.data.message ?? 'SERVER ERROR');
      });
  }, [spaceId]);

  return (
    <div className={cs.spaceContainer}>
      <div className={cs.itemTop}>
        <span>{spaceInfo.spaceTitle}</span>
        {spaceInfo.myRole === 'ADMIN' && (
          <Link className={cs.setting} to='./setting'>
            <Setting />
          </Link>
        )}
      </div>
      <div className={cs.itemButtonWrapper}>
        <button type='button' onClick={randomQuestion.openModal}>
          <Play />
        </button>
        <RandomQModal useModal={randomQuestion} spaceInfo={spaceInfo} />
        <button type='button' onClick={createQuestion.openModal}>
          <NewItem />
        </button>
        <CreateQModal useModal={createQuestion} spaceInfo={spaceInfo} />
      </div>
      {itemListValue.itemList.length === 0 && <EmptyLottie />}
      <ul className={cs.itemCardList}>
        {itemListValue.itemList.map((item) => (
          <li key={item.itemId} className={cs.itemCard}>
            <Item item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
