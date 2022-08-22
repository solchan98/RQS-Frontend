import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from 'react';

import { useSetRecoilState } from 'recoil';
import { spaceListState } from 'recoil/atoms/spaces';
import { useLogout } from 'hooks/useLogout';
import { updateSpaceTitle } from 'service/spaces';
import { ISpace } from 'types/space';

interface Props {
  space: ISpace;
}

export const UpdateTitle = ({ space }: Props) => {
  const logout = useLogout();
  const setSpaceListValue = useSetRecoilState(spaceListState);

  const [isTitleUpdate, setIsTitleUpdate] = useState(false);
  const onChangeIsTitleUpdate: MouseEventHandler<HTMLButtonElement> = () => setIsTitleUpdate((prev) => !prev);

  const [title, setTitle] = useState(space.title);
  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => setTitle(e.currentTarget.value);

  const onSubmitTitleUpdate: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    updateSpaceTitle(Number(space.spaceId), title)
      .then(() => {
        setSpaceListValue((prev) => ({
          ...prev,
          spaceList: prev.spaceList.map((s) => (s.spaceId === Number(space.spaceId) ? { ...s, title } : s)),
        }));
        setIsTitleUpdate(false);
      })
      .catch((err) => {
        if (err.status === 401) logout();
        alert(err.response?.data.message ?? 'SERVER ERROR');
      });
  };

  return (
    <div>
      {!isTitleUpdate && (
        <div>
          <div>{space.title}</div>
          <button type='button' onClick={onChangeIsTitleUpdate}>
            변경
          </button>
        </div>
      )}
      {isTitleUpdate && (
        <form id='updateTitle' onSubmit={onSubmitTitleUpdate}>
          <input value={title} onChange={onChangeTitle} />
          <button type='button' onClick={onChangeIsTitleUpdate}>
            취소
          </button>
          <button type='submit' form='updateTitle'>
            저장
          </button>
        </form>
      )}
    </div>
  );
};
