import timeAgo from 'util/timaAgo';
import { ISpace } from 'types/space';

import { Members, Question, UnLock, Lock } from 'assets/svgs';
import cs from './space.module.scss';
import cx from 'classnames';

interface Props {
  space: ISpace;
  pub?: boolean;
}

export const Space = ({ space, pub = false }: Props) => {
  return (
    <div className={cs.container}>
      <div className={cs.top}>
        <div className={cs.subInfo}>
          {!pub && (space.visibility ? <UnLock /> : <Lock />)}
          {!pub && <span className={cs.role}>{space.authority}</span>}
        </div>
        <span className={cs.timestamp}>{timeAgo.format(new Date(space.createdAt))}</span>
      </div>
      <div className={cx(cs.main)}>
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
