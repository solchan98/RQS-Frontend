import { useRecoilState } from 'recoil';
import { FormEventHandler } from 'react';

import { useLogout } from 'hooks/useLogout';
import { spaceListState } from 'recoil/atoms/spaces';
import { changeSpaceMemberRole } from 'service/spaces';
import { ISpace } from 'types/space';

import cs from './manageSpaceMember.module.scss';
import cx from 'classnames';

interface Props {
  space: ISpace;
}

export const ManageSpaceMember = ({ space }: Props) => {
  // const logout = useLogout();
  //
  // const [spaceListValue, setSpaceListValue] = useRecoilState(spaceListState);
  //
  // const onSubmitChangeRole: FormEventHandler<HTMLFormElement> = (e) => {
  //   e.preventDefault();
  //   const { id, role } = e.currentTarget.dataset;
  //   if (!role) return;
  //   changeSpaceMemberRole(Number(space.spaceId), Number(id), role)
  //     .then((data) => {
  //       const curSpace = spaceListValue.spaceList.find((s) => s.spaceId === Number(space.spaceId));
  //       const changedMemberList =
  //         curSpace?.spaceMemberList.map((sm) => (sm.spaceMemberId === Number(id) ? data : sm)) ?? [];
  //       setSpaceListValue((prev) => ({
  //         ...prev,
  //         spaceList: prev.spaceList.map((s) =>
  //           s.spaceId === Number(space.spaceId) ? { ...s, spaceMemberList: changedMemberList } : s
  //         ),
  //       }));
  //     })
  //     .catch((err) => {
  //       if (err.status === 401) logout();
  //       alert(err.response?.data.message ?? 'SERVER ERROR');
  //     });
  // };

  return (
    <ul className={cs.container}>
      {/* <li className={cs.s}> */}
      {/*  <span className={cs.email}>이메일</span> */}
      {/*  <span className={cs.role}>권한</span> */}
      {/*  <span className={cs.delete} /> */}
      {/* </li> */}
      {/* {space.spaceMemberList.map((spaceMember) => ( */}
      {/*  <li key={spaceMember.spaceMemberId}> */}
      {/*    <span className={cs.email}>{spaceMember.email}</span> */}
      {/*    <div className={cs.role}> */}
      {/*      <form */}
      {/*        id={`changeRoleAdmin_${spaceMember.spaceMemberId}`} */}
      {/*        data-role='ADMIN' */}
      {/*        data-id={spaceMember.spaceMemberId} */}
      {/*        onSubmit={onSubmitChangeRole} */}
      {/*      > */}
      {/*        <button */}
      {/*          className={cx(cs.roleBtn, spaceMember.role === 'ADMIN' && cs.myRole)} */}
      {/*          type='submit' */}
      {/*          form={`changeRoleAdmin_${spaceMember.spaceMemberId}`} */}
      {/*        > */}
      {/*          ADMIN */}
      {/*        </button> */}
      {/*      </form> */}
      {/*      <form */}
      {/*        id={`changeRoleMember_${spaceMember.spaceMemberId}`} */}
      {/*        data-role='MEMBER' */}
      {/*        data-id={spaceMember.spaceMemberId} */}
      {/*        onSubmit={onSubmitChangeRole} */}
      {/*      > */}
      {/*        <button */}
      {/*          className={cx(cs.roleBtn, spaceMember.role === 'MEMBER' && cs.myRole)} */}
      {/*          type='submit' */}
      {/*          data-id='MEMBER' */}
      {/*          form={`changeRoleMember_${spaceMember.spaceMemberId}`} */}
      {/*        > */}
      {/*          MEMBER */}
      {/*        </button> */}
      {/*      </form> */}
      {/*    </div> */}
      {/*    <form className={cs.delete} id='deleteMember'> */}
      {/*      <button type='submit' form='deleteMember'> */}
      {/*        제거 */}
      {/*      </button> */}
      {/*    </form> */}
      {/*  </li> */}
      {/* ))} */}
    </ul>
  );
};
