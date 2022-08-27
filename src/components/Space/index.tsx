import { useMemo } from 'react';
import timeAgo from 'util/timaAgo';
import { ISpace } from 'types/space';
import { useRecoilValue } from 'recoil';
import { memberState } from 'recoil/atoms/member';

import cs from './space.module.scss';
import { Members, Question, UnLock, Lock } from 'assets/svgs';

interface Props {
  space: ISpace;
}

export const Space = ({ space }: Props) => {
  const memberValue = useRecoilValue(memberState);

  const me = useMemo(() => {
    return space.spaceMemberList.find((spaceMember) => spaceMember.email === memberValue.email);
  }, [memberValue.email, space.spaceMemberList]);

  return (
    <div className={cs.container}>
      <div className={cs.top}>
        <div className={cs.subInfo}>
          {space.visibility ? <UnLock /> : <Lock />}
          <span className={cs.role}>{me?.role ?? 'GUEST'}</span>
        </div>
        <span className={cs.timestamp}>{timeAgo.format(new Date(space.createdAt))}</span>
      </div>
      <div className={cs.main}>
        <span className={cs.content}>{space.title}</span>
      </div>
      <div className={cs.status}>
        <div className={cs.cntWrapper}>
          <Question />
          <span>{space.itemCount}</span>
        </div>
        <div className={cs.cntWrapper}>
          <Members />
          <span>{space.spaceMemberList.length}</span>
        </div>
      </div>
    </div>
  );
};
