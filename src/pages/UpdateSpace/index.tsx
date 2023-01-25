import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FormEventHandler, MouseEventHandler, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useLogout } from 'hooks/useLogout';
import { changeVisibility, checkIsSpaceCreator, deleteSpace, getSpace } from 'service/spaces';
import { ISpace } from 'types/space';

import { ManageSpaceMember } from './ManageSpaceMember';
import { UpdateTitle } from './UpdateTitle';
import cs from './updateSpace.module.scss';
import cx from 'classnames';

export const UpdateSpace = () => {
  const { spaceId } = useParams();
  const [spaceState, setSpaceState] = useState<ISpace>({} as ISpace);

  const nav = useNavigate();
  const [hasAccessRole, setHasAccessRole] = useState(false);

  const onAccessible = (message: IMessage) => {
    if (message.message !== '200') {
      nav(-1);
      alert('권한이 존재하지 않아 접근할 수 없습니다.');
      return;
    }
    getSpace(Number(spaceId)).then(onSuccessGetSpace).catch(onError);
  };

  const onSuccessGetSpace = (space: ISpace) => {
    setSpaceState((prev) => ({ ...prev, ...space, spaceId: Number(spaceId) }));
    setHasAccessRole((prev) => !prev);
  };

  const onError = (err: AxiosError<{ message: string }>) => {
    if (err.response?.status === 401) {
      logout();
    } else {
      nav(-1);
      alert(err.response?.data.message);
    }
  };

  const logout = useLogout();
  useQuery([`#space_${spaceId}`], () => checkIsSpaceCreator(Number(spaceId)), {
    onSuccess: onAccessible,
    onError,
  });

  const [checkDelete, setCheckDelete] = useState(false);
  const onSubmitSpaceDelete: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!checkDelete) {
      setCheckDelete(true);
    } else {
      deleteSpace(Number(spaceId))
        .then(() => nav('/'))
        .catch((err) => (err.response?.status === 401 ? logout() : alert(err.response?.data.message)));
    }
  };

  const onClickExit = () => nav(-1);

  const changeVisibilityHandler = (visibility: boolean) => {
    alert('상태가 변경되었습니다.');
    setSpaceState((prev) => ({
      ...prev,
      visibility,
    }));
  };
  const onClickChangeVisibility: MouseEventHandler<HTMLButtonElement> = (e) => {
    const visibility: boolean = e.currentTarget.dataset.id === 'show';
    changeVisibility(spaceState.spaceId, visibility)
      .then(() => changeVisibilityHandler(visibility))
      .catch((err) => (err.response?.status === 401 ? logout() : alert(err.response?.data.message)));
  };

  if (!hasAccessRole) return <div>권한 확인중...</div>;

  return (
    <div className={cs.container}>
      <div className={cs.top}>
        <span className={cs.title}>스페이스 관리</span>
      </div>
      <div className={cs.updateTitleWrapper}>
        <span className={cs.label}>Space Name</span>
        <UpdateTitle space={spaceState} />
      </div>
      <div className={cs.manageSpaceMemberWrapper}>
        <span className={cs.label}>Space Member List</span>
        <ManageSpaceMember space={spaceState} />
      </div>
      <div className={cs.visibilityWrapper}>
        <button
          type='button'
          className={cx(spaceState.visibility && cs.select)}
          data-id='show'
          onClick={onClickChangeVisibility}
        >
          공개
        </button>
        <button
          type='button'
          className={cx(!spaceState.visibility && cs.select)}
          data-id='hidden'
          onClick={onClickChangeVisibility}
        >
          비공개
        </button>
      </div>
      <div className={cs.bottom}>
        <form id='spaceDelete' onSubmit={onSubmitSpaceDelete}>
          <button className={cx(cs.delete, cs.button)} type='submit' form='spaceDelete'>
            삭제하기
          </button>
          {checkDelete && <span className={cs.checkDelete}>한번더 누르면 삭제가 진행됩니다.</span>}
        </form>
        <button className={cx(cs.exit, cs.button)} type='button' onClick={onClickExit}>
          뒤로가기
        </button>
      </div>
    </div>
  );
};
