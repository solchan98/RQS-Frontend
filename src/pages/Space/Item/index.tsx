import { Link } from 'react-router-dom';

import cs from './item.module.scss';

export const Item = () => {
  return (
    <>
      <div className={cs.itemTop}>
        <Link className={cs.avatar} to='#'>
          <img
            src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            alt='profile_img'
          />
        </Link>
        <div className={cs.itemTopSide}>
          <span className={cs.profileNickname}>Sol Chan</span>
          <span className={cs.timestamp}>10h ago</span>
        </div>
      </div>
      <div className={cs.itemMain}>HTTP의 상위 버전인 HTTPS의 특징은 무엇이 있나요? </div>
    </>
  );
};
