import { AxiosError } from 'axios';
import { useMount } from 'react-use';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { FormEventHandler, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { memberState } from 'recoil/atoms/member';
import { deleteSpace, getSpace } from 'service/spaces';
import { useLogout } from 'hooks/useLogout';
import { ISpace } from 'types/space';

import { ManageSpaceMember } from './ManageSpaceMember';
import { UpdateTitle } from './UpdateTitle';
import cs from './updateSpace.module.scss';
import cx from 'classnames';

export const UpdateSpace = () => {
  const { spaceId } = useParams();

  const logout = useLogout();
  const { data: space } = useQuery([`#space_${spaceId}`], () => getSpace(Number(spaceId)), {
    select: (data): ISpace => data,
    onError: (err: AxiosError<{ message: string }>) =>
      err.response?.status === 401 ? logout : alert(err.response?.data.message),
  });

  const nav = useNavigate();
  const memberValue = useRecoilValue(memberState);
  const [hasAccessRole, setHasAccessRole] = useState(false);
  useMount(() => {
    const me = space?.spaceMemberList.find((spaceMember) => spaceMember.email === memberValue.email);
    if (!me || me.role !== 'ADMIN') {
      nav(-1);
      alert('권한이 존재하지 않아 접근할 수 없습니다.');
    } else {
      setHasAccessRole((prev) => !prev);
    }
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
        {space && <UpdateTitle space={space} />}
      </div>
      <div className={cs.manageSpaceMemberWrapper}>
        <span className={cs.label}>Space Member List</span>
        {space && <ManageSpaceMember space={space} />}
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
