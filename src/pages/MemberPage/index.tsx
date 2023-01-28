import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { memberState } from 'recoil/atoms/member';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';

import { Avatar } from 'components/Avatar';
import { IMemberSubject } from 'types/member';
import { getMemberInfo } from 'service/member';
import cx from 'classnames';
import cs from './mypage.module.scss';

export const MemberPage = () => {
  const { memberId } = useParams();

  const { memberId: loginMemberId } = useRecoilValue(memberState);

  const { data: memberInfo } = useQuery([`#member_${memberId}`], () => getMemberInfo(Number(memberId)), {
    select: (data): IMemberSubject => data,
  });

  return (
    <div className={cs.container}>
      <div className={cs.content}>
        <div className={cs.leftSection}>
          <div>
            <Avatar memberId={memberInfo?.memberId} src={String(memberInfo?.avatar)} width={128} height={128} />
          </div>
          <div className={cs.info}>
            <div className={cs.name}>{memberInfo?.nickname}</div>
            <div className={cs.email}>{memberInfo?.email}</div>
          </div>
        </div>
        <div className={cs.rightSection}>
          {Number(memberId) === loginMemberId && (
            <Link className={cs.profileLink} to={`/update/member/${memberId}`}>
              프로필 수정
            </Link>
          )}
        </div>
      </div>
      <div className={cs.nav}>
        <NavLink className={({ isActive }) => cx(cs.el, isActive && cs.selected)} to={`/${memberId}/space`}>
          스페이스
        </NavLink>
        <NavLink className={({ isActive }) => cx(cs.el, isActive && cs.selected)} to={`/${memberId}/scrap`}>
          스크랩
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};
