import { useMount } from 'react-use';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from 'react';

import { useLogout } from 'hooks/useLogout';
import { updateSpaceTitle } from 'service/spaces';
import { spaceListState } from 'recoil/atoms/spaces';
import { memberState } from 'recoil/atoms/member';
import { ISpace } from 'types/space';

import cs from './updateSpace.module.scss';

export const UpdateSpace = () => {
  const { spaceId } = useParams();
  const logout = useLogout();

  const [spaceListValue, setSpaceListValue] = useRecoilState(spaceListState);
  const [space, setSpace] = useState<ISpace | undefined>(
    spaceListValue.spaceList.find((s) => s.spaceId === Number(spaceId))
  );

  const [isTitleUpdate, setIsTitleUpdate] = useState(false);
  const onChangeIsTitleUpdate: MouseEventHandler<HTMLButtonElement> = () => setIsTitleUpdate((prev) => !prev);
  const [title, setTitle] = useState(space?.title);
  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => setTitle(e.currentTarget.value);
  const onSubmitTitleUpdate: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!title) return;
    updateSpaceTitle(Number(spaceId), title)
      .then((data) => {
        setSpace(data);
        setSpaceListValue((prev) => ({
          ...prev,
          spaceList: prev.spaceList.map((s) => (s.spaceId === Number(spaceId) ? { ...s, title: title ?? '' } : s)),
        }));
        setIsTitleUpdate(false);
      })
      .catch((err) => {
        if (err.status === 401) logout();
        alert(err.response?.data.message ?? 'SERVER ERROR');
      });
  };

  const nav = useNavigate();
  const memberValue = useRecoilValue(memberState);

  useMount(() => {
    const spaceMember = space?.spaceMemberList.find((s) => s.email === memberValue.email);
    if (!spaceMember || spaceMember.role !== 'ADMIN') {
      alert('권한이 존재하지 않아 페이지에 접근 불가능합니다.');
      nav(-1);
    }
  });

  return (
    <div className={cs.container}>
      <div className={cs.top}>스페이스 관리</div>
      <div>
        {!isTitleUpdate && (
          <>
            <div>{space?.title}</div>
            <button type='button' onClick={onChangeIsTitleUpdate}>
              변경
            </button>
          </>
        )}
        {isTitleUpdate && (
          <form id='updateTitle' onSubmit={onSubmitTitleUpdate}>
            <input value={title} onChange={onChangeTitle} />
            <button type='submit' form='updateTitle'>
              저장
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
