import timeAgo from 'util/timaAgo';
import { ISpace } from 'types/space';

import { Members, Question, UnLock, Lock } from 'assets/svgs';
import cs from './space.module.scss';
import cx from 'classnames';

interface Props {
  space: ISpace;
  pub?: boolean;
}

const DEFAULT_THUMBNAIL = 'https://cdn.pixabay.com/photo/2020/03/21/14/45/rocket-4954229_1280.jpg';

export const Space = ({ space, pub = false }: Props) => {
  return (
    <div className={cs.container}>
      <div className={cs.top}>
        <img className={cs.thumbnail} src={space.imageUrl ?? DEFAULT_THUMBNAIL} alt='space-thumbnail' />
      </div>
      <div className={cx(cs.main)}>
        <div className={cs.contentWrapper}>
          <p className={cs.title}>{space.title}</p>
          <p className={cs.content}>{space.content}</p>
        </div>
        <div className={cs.mainSub}>
          <div className={cs.subInfo}>
            {!pub && (space.visibility ? <UnLock /> : <Lock />)}
            {!pub && <span className={cs.role}>{space.authority}</span>}
          </div>
          <p className={cs.timestamp}>{timeAgo.format(new Date(space.createdAt))}</p>
        </div>
      </div>
      <div className={cs.status}>
        <div className={cs.cntWrapper}>
          <Question />
          <span>{space.quizCount}</span>
        </div>
        <div className={cs.cntWrapper}>
          <Members />
          <span>{space.spaceMemberCount}</span>
        </div>
      </div>
    </div>
  );
};
