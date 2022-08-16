import { Link } from 'react-router-dom';

import cs from './spaceItem.module.scss';
import { Members, Question } from '../../../assets/svgs';

export const SpaceItem = () => {
  return (
    <>
      <div className={cs.spaceItemTop}>
        <Link className={cs.avatar} to='#'>
          <img
            src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            alt='profile_img'
          />
        </Link>
        <div className={cs.spaceItemTopSide}>
          <span className={cs.profileNickname}>Sol Chan</span>
          <span className={cs.timestamp}>10h ago</span>
        </div>
      </div>
      <div className={cs.spaceItemMain}>벡엔드 면접 예상 질문 모음벡엔드 면접 예상 질문 모음</div>
      <div className={cs.spaceItemBottom}>
        <div className={cs.spaceItemBottomItem}>
          <Members width='18' height='18' />
          <span>12</span>
        </div>
        <div className={cs.spaceItemBottomItem}>
          <Question width='18' height='18' />
          <span>38</span>
        </div>
      </div>
    </>
  );
};
