import { useRecoilState } from 'recoil';
import { FormEventHandler } from 'react';

import { useLogout } from 'hooks/useLogout';
import { spaceListState } from 'recoil/atoms/spaces';
import { changeSpaceMemberRole } from 'service/spaces';
import { ISpace } from 'types/space';

interface Props {
  space: ISpace;
}

export const ManageSpaceMember = ({ space }: Props) => {
  const logout = useLogout();

  const [spaceListValue, setSpaceListValue] = useRecoilState(spaceListState);

  const onSubmitChangeRole: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { id, role } = e.currentTarget.dataset;
    if (!role) return;
    changeSpaceMemberRole(Number(space.spaceId), Number(id), role)
      .then((data) => {
        const curSpace = spaceListValue.spaceList.find((s) => s.spaceId === Number(space.spaceId));
        const changedMemberList =
          curSpace?.spaceMemberList.map((sm) => (sm.spaceMemberId === Number(id) ? data : sm)) ?? [];
        setSpaceListValue((prev) => ({
          ...prev,
          spaceList: prev.spaceList.map((s) =>
            s.spaceId === Number(space.spaceId) ? { ...s, spaceMemberList: changedMemberList } : s
          ),
        }));
      })
      .catch((err) => {
        if (err.status === 401) logout();
        alert(err.response?.data.message ?? 'SERVER ERROR');
      });
  };

  return (
    <div>
      <div>멤버 리스트</div>
      <ul>
        {space.spaceMemberList.map((spaceMember) => (
          <li key={spaceMember.spaceMemberId}>
            <span>{spaceMember.email}</span>
            <form
              id={`changeRoleAdmin_${spaceMember.spaceMemberId}`}
              data-role='ADMIN'
              data-id={spaceMember.spaceMemberId}
              onSubmit={onSubmitChangeRole}
            >
              <button type='submit' form={`changeRoleAdmin_${spaceMember.spaceMemberId}`}>
                ADMIN
                {spaceMember.role === 'ADMIN' && ' O'}
              </button>
            </form>
            <form
              id={`changeRoleMember_${spaceMember.spaceMemberId}`}
              data-role='MEMBER'
              data-id={spaceMember.spaceMemberId}
              onSubmit={onSubmitChangeRole}
            >
              <button type='submit' data-id='MEMBER' form={`changeRoleMember_${spaceMember.spaceMemberId}`}>
                MEMBER
                {spaceMember.role === 'MEMBER' && ' O'}
              </button>
            </form>
            <form id='deleteMember'>
              <button type='submit' form='deleteMember'>
                제외
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};
