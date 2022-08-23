import { useMemo } from 'react';
import { useMount } from 'react-use';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';

import { memberState } from 'recoil/atoms/member';
import { itemListState } from 'recoil/atoms/items';
import { IItem } from 'types/item';

export const UpdateItem = () => {
  const { itemId } = useParams();
  const nav = useNavigate();

  const itemListValue = useRecoilValue(itemListState);
  const memberValue = useRecoilValue(memberState);

  const item = useMemo(() => {
    return itemListValue.itemList.find((i) => i.itemId === Number(itemId)) ?? ({} as IItem);
  }, [itemId, itemListValue.itemList]);

  useMount(() => {
    const isCreator = memberValue.email === item.spaceMemberResponse.email;
    if (!isCreator) {
      alert('권한이 존재하지 않아 페이지에 접근 불가능합니다.');
      nav(-1);
    }
  });

  return (
    <div>
      아이템 업데이트 페이지
      <div>{item.question}</div>
      <div>{item.answer}</div>
      <div>{item.hint}</div>
      <div>{item.spaceMemberResponse.email}</div>
    </div>
  );
};
