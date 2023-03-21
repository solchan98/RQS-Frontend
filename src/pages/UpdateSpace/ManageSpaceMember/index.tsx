import { useQuery } from '@tanstack/react-query';
import { FormEventHandler, useState } from 'react';

import { ISpace, ISpaceMember } from 'types/space';
import { useFetchError } from 'hooks/useFetchError';
import { changeSpaceMemberRole, getSpaceMemberList } from 'service/spaces';

import cx from 'classnames';
import cs from './manageSpaceMember.module.scss';

interface Props {
  space: ISpace;
}

export const ManageSpaceMember = ({ space }: Props) => {
  const [spaceMemberList, setSpaceMemberList] = useState<ISpaceMember[]>([]);

  useQuery([`#spaceMemberList_in_spaceId_${space.spaceId}`], () => getSpaceMemberList(Number(space.spaceId)), {
    onSuccess: (data: ISpaceMember[]) => setSpaceMemberList(data),
  });

  const changeRoleSuccessHandler = (data: ISpaceMember) => {
    setSpaceMemberList((prev) =>
      prev.map((spaceMember) => (spaceMember.spaceMemberId === data.spaceMemberId ? data : spaceMember))
    );
  };

  const onFetchError = useFetchError();
  const onSubmitChangeRole: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { id, role } = e.currentTarget.dataset;
    if (!role) return;
    changeSpaceMemberRole(Number(space.spaceId), Number(id), role)
      .then((data: ISpaceMember) => changeRoleSuccessHandler(data))
      .catch(onFetchError);
  };
  return (
    <ul className={cs.container}>
      <li className={cs.s}>
        <span className={cs.email}>이메일</span>
        <span className={cs.role}>권한</span>
        <span className={cs.delete} />
      </li>
      {spaceMemberList.map((spaceMember) => (
        <li key={spaceMember.spaceMemberId}>
          <span className={cs.email}>{spaceMember.email}</span>
          <div className={cs.role}>
            <form
              id={`changeRoleAdmin_${spaceMember.spaceMemberId}`}
              data-role='ADMIN'
              data-id={spaceMember.spaceMemberId}
              onSubmit={onSubmitChangeRole}
            >
              <button
                className={cx(cs.roleBtn, spaceMember.role === 'ADMIN' && cs.myRole)}
                type='submit'
                form={`changeRoleAdmin_${spaceMember.spaceMemberId}`}
              >
                ADMIN
              </button>
            </form>
            <form
              id={`changeRoleMember_${spaceMember.spaceMemberId}`}
              data-role='MEMBER'
              data-id={spaceMember.spaceMemberId}
              onSubmit={onSubmitChangeRole}
            >
              <button
                className={cx(cs.roleBtn, spaceMember.role === 'MEMBER' && cs.myRole)}
                type='submit'
                data-id='MEMBER'
                form={`changeRoleMember_${spaceMember.spaceMemberId}`}
              >
                MEMBER
              </button>
            </form>
          </div>
          <form className={cs.delete} id='deleteMember'>
            <button type='submit' form='deleteMember'>
              제거
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
};
