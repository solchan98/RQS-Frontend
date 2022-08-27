import timeAgo from 'util/timaAgo';
import { ISpace } from 'types/space';

import cs from './space.module.scss';
import { Members, Question } from 'assets/svgs';

const AVATAR = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

interface Props {
  space: ISpace;
}

// TODO: space.spaceMemberList[0] -> space.creator | space 응답에 creator 추가 예쩡

export const Space = ({ space }: Props) => {
  return (
    <div className={cs.container}>
      <div className={cs.top}>
        <div className={cs.avatar}>
          <img src={space.spaceMemberList[0]?.avatar ?? AVATAR} alt='profile_img' />
        </div>
        <div className={cs.aside}>
          <span className={cs.nickname}>{space.spaceMemberList[0].nickname}</span>
          <span className={cs.timestamp}>{timeAgo.format(new Date(space.createdAt))}</span>
        </div>
      </div>
      <div className={cs.main}>
        <span className={cs.content}>{space.title}</span>
      </div>
      <div className={cs.status}>
        <div className={cs.cntWrapper}>
          <Question />
          <span>121</span>
        </div>
        <div className={cs.cntWrapper}>
          <Members />
          <span>{space.spaceMemberList.length}</span>
        </div>
      </div>
    </div>
  );
};
