import { AxiosError } from 'axios';
import { useMount } from 'react-use';
import { useQuery } from '@tanstack/react-query';
import { FormEventHandler, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useLogout } from 'hooks/useLogout';
import { deleteSpace, getSpace } from 'service/spaces';
import { ISpace } from 'types/space';

import { ManageSpaceMember } from './ManageSpaceMember';
import { UpdateTitle } from './UpdateTitle';
import cs from './updateSpace.module.scss';
import cx from 'classnames';
import { CreateInviteLink } from './CreateInviteLink';

export const UpdateSpace = () => {
  const { spaceId } = useParams();
  const [spaceState, setSpaceState] = useState<ISpace>({} as ISpace);

  const nav = useNavigate();
  const [hasAccessRole, setHasAccessRole] = useState(false);
  useMount(() => {});

  const onSuccessGetSpace = (space: ISpace) => {
    if (space.authority !== 'ADMIN') {
      nav(-1);
      alert('권한이 존재하지 않아 접근할 수 없습니다.');
    } else {
      setSpaceState((prev) => ({ ...prev, ...space, spaceId: Number(spaceId) }));
      setHasAccessRole((prev) => !prev);
    }
  };
  const onErrorGetSpace = (err: AxiosError<{ message: string }>) => {
    if (err.response?.status === 401) {
      logout();
    } else {
      nav(-1);
      alert(err.response?.data.message);
    }
  };

  const logout = useLogout();
  useQuery([`#space_${spaceId}`], () => getSpace(Number(spaceId)), {
    select: (data): ISpace => data,
    onSuccess: (data: ISpace) => onSuccessGetSpace(data),
    onError: (err: AxiosError<{ message: string }>) => onErrorGetSpace(err),
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
      {hasAccessRole && (
        <div className={cs.manageSpaceMemberWrapper}>
          <span className={cs.label}>Space Member List</span>
          <ManageSpaceMember space={spaceState} />
        </div>
      )}
      <div className={cs.inviteWrapper}>
        <CreateInviteLink spaceId={Number(spaceId)} />
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
