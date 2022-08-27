import { FormEventHandler, useMemo, useState } from 'react';
import { useMount } from 'react-use';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';

import { memberState } from 'recoil/atoms/member';
import { UpdateTitle } from './UpdateTitle';
import { ManageSpaceMember } from './ManageSpaceMember';
import { ISpace } from 'types/space';

import cx from 'classnames';
import cs from './updateSpace.module.scss';
import { deleteSpace } from 'service/spaces';
import { useLogout } from 'hooks/useLogout';

export const UpdateSpace = () => {
  // const { spaceId } = useParams();
  // const nav = useNavigate();
  //
  // const memberValue = useRecoilValue(memberState);
  // const [spaceListValue, setSpaceListValue] = useRecoilState(spaceListState);
  //
  // const space = useMemo(() => {
  //   return spaceListValue.spaceList.find((s) => s.spaceId === Number(spaceId)) ?? ({} as ISpace);
  // }, [spaceId, spaceListValue.spaceList]);
  //
  // useMount(() => {
  //   const spaceMember = space?.spaceMemberList.find((s) => s.email === memberValue.email);
  //   if (!spaceMember || spaceMember.role !== 'ADMIN') {
  //     alert('권한이 존재하지 않아 페이지에 접근 불가능합니다.');
  //     nav(-1);
  //   }
  // });
  //
  // const logout = useLogout();
  // const deleteSpaceSuccessHandler = () => {
  //   setSpaceListValue((prev) => ({
  //     ...prev,
  //     spaceList: prev.spaceList.filter((s) => s.spaceId !== Number(spaceId)),
  //   }));
  //   nav('/');
  // };
  //
  // const [checkDelete, setCheckDelete] = useState(false);
  // const onSubmitSpaceDelete: FormEventHandler<HTMLFormElement> = (e) => {
  //   e.preventDefault();
  //   if (!checkDelete) {
  //     setCheckDelete(true);
  //   } else {
  //     deleteSpace(Number(spaceId))
  //       .then(() => deleteSpaceSuccessHandler())
  //       .catch((err) => {
  //         if (err.response.data.status === 401) {
  //           logout();
  //         } else {
  //           alert(err.response.data?.message ?? 'SERVER ERROR');
  //         }
  //       });
  //   }
  // };
  // const onClickExit = () => nav(-1);

  return (
    <div className={cs.container}>
      {/* <div className={cs.top}>스페이스 관리</div> */}
      {/* <div className={cs.updateTitleWrapper}> */}
      {/*  <span className={cs.label}>Space Name</span> */}
      {/*  <UpdateTitle space={space} /> */}
      {/* </div> */}
      {/* <div className={cs.manageSpaceMemberWrapper}> */}
      {/*  <span className={cs.label}>Space Member Management</span> */}
      {/*  <ManageSpaceMember space={space} /> */}
      {/* </div> */}
      {/* <div className={cs.bottom}> */}
      {/*  <form id='spaceDelete' onSubmit={onSubmitSpaceDelete}> */}
      {/*    <button className={cx(cs.delete, cs.button)} type='submit' form='spaceDelete'> */}
      {/*      삭제하기 */}
      {/*    </button> */}
      {/*    {checkDelete && <span className={cs.checkDelete}>한번더 누르면 삭제가 진행됩니다.</span>} */}
      {/*  </form> */}
      {/*  <button className={cx(cs.exit, cs.button)} type='button' onClick={onClickExit}> */}
      {/*    돌아가기 */}
      {/*  </button> */}
      {/* </div> */}
    </div>
  );
};
