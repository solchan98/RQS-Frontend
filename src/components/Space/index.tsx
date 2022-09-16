import timeAgo from 'util/timaAgo';
import { ISpace } from 'types/space';

import cs from './space.module.scss';
import { Members, Question, UnLock, Lock } from 'assets/svgs';

interface Props {
  space: ISpace;
}

export const Space = ({ space }: Props) => {
  return (
    <div className={cs.container}>
      <div className={cs.top}>
        <div className={cs.subInfo}>
          {space.visibility ? <UnLock /> : <Lock />}
          <span className={cs.role}>{space.authority ?? 'GUEST'}</span>
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
          <span>{space.spaceMemberCount}</span>
        </div>
      </div>
    </div>
  );
};
