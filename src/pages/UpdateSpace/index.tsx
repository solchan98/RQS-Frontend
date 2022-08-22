import { useMount } from 'react-use';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from 'react';

import { useLogout } from 'hooks/useLogout';
import { changeSpaceMemberRole, updateSpaceTitle } from 'service/spaces';
import { spaceListState } from 'recoil/atoms/spaces';
import { memberState } from 'recoil/atoms/member';
import { ISpace } from 'types/space';

import cs from './updateSpace.module.scss';

export const UpdateSpace = () => {
  const { spaceId } = useParams();
  const logout = useLogout();
  const nav = useNavigate();
  const memberValue = useRecoilValue(memberState);

  const [spaceListValue, setSpaceListValue] = useRecoilState(spaceListState);
  const [space, setSpace] = useState<ISpace>(
    spaceListValue.spaceList.find((s) => s.spaceId === Number(spaceId)) ?? ({} as ISpace)
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

  useMount(() => {
    const spaceMember = space?.spaceMemberList.find((s) => s.email === memberValue.email);
    if (!spaceMember || spaceMember.role !== 'ADMIN') {
      alert('권한이 존재하지 않아 페이지에 접근 불가능합니다.');
      nav(-1);
    }
  });

  const onSubmitChangeRole: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { id, role } = e.currentTarget.dataset;
    if (!role) return;
    changeSpaceMemberRole(Number(spaceId), Number(id), role)
      .then((data) => {
        const curSpace = spaceListValue.spaceList.find((s) => s.spaceId === Number(spaceId));
        const changedMemberList =
          curSpace?.spaceMemberList.map((sm) => (sm.spaceMemberId === Number(id) ? data : sm)) ?? [];
        setSpaceListValue((prev) => ({
          ...prev,
          spaceList: prev.spaceList.map((s) =>
            s.spaceId === Number(spaceId) ? { ...s, spaceMemberList: changedMemberList } : s
          ),
        }));
        setSpace((prev) => ({
          ...prev,
          spaceMemberList: changedMemberList,
        }));
      })
      .catch((err) => {
        if (err.status === 401) logout();
        alert(err.response?.data.message ?? 'SERVER ERROR');
      });
  };

  return (
    <div className={cs.container}>
      <div className={cs.top}>스페이스 관리</div>
      <div>
        {!isTitleUpdate && (
          <div>
            <div>{space?.title}</div>
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
      <div>
        <div>멤버 리스트</div>
        <ul>
          {space?.spaceMemberList.map((spaceMember) => (
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
    </div>
  );
};
