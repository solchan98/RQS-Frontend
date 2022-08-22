import { useMemo } from 'react';
import { useMount } from 'react-use';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';

import { memberState } from 'recoil/atoms/member';
import { spaceListState } from 'recoil/atoms/spaces';
import { ISpace } from 'types/space';

import cs from './updateSpace.module.scss';
import { UpdateTitle } from './UpdateTitle';
import { ManageSpaceMember } from './ManageSpaceMember';

export const UpdateSpace = () => {
  const { spaceId } = useParams();
  const nav = useNavigate();

  const memberValue = useRecoilValue(memberState);
  const spaceListValue = useRecoilValue(spaceListState);

  const space = useMemo(() => {
    return spaceListValue.spaceList.find((s) => s.spaceId === Number(spaceId)) ?? ({} as ISpace);
  }, [spaceId, spaceListValue.spaceList]);

  useMount(() => {
    const spaceMember = space?.spaceMemberList.find((s) => s.email === memberValue.email);
    if (!spaceMember || spaceMember.role !== 'ADMIN') {
      alert('권한이 존재하지 않아 페이지에 접근 불가능합니다.');
      nav(-1);
    }
  });

  const onClickExit = () => nav(-1);

  return (
    <div className={cs.container}>
      <div className={cs.top}>스페이스 관리</div>
      <div className={cs.updateTitleWrapper}>
        <span className={cs.label}>Space Name</span>
        <UpdateTitle space={space} />
      </div>
      <div className={cs.manageSpaceMemberWrapper}>
        <span className={cs.label}>Space Member Management</span>
        <ManageSpaceMember space={space} />
      </div>
      <div className={cs.bottom}>
        <form id='spaceDelete'>
          <button className={cs.exit} type='submit' form='spaceDelete'>
            삭제하기
          </button>
          <button type='button' onClick={onClickExit}>
            나가기
          </button>
        </form>
      </div>
    </div>
  );
};
