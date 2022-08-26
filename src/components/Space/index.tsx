import { Link } from 'react-router-dom';

import cs from './space.module.scss';
import { Members, Question } from '../../assets/svgs';

const AVATAR = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

export const Space = () => {
  return (
    <div className={cs.container}>
      <div className={cs.top}>
        <Link className={cs.avatar} to='#'>
          <img src={AVATAR} alt='profile_img' />
        </Link>
        <div className={cs.aside}>
          <span className={cs.nickname}>Mark</span>
          <span className={cs.timestamp}>12시간 전</span>
        </div>
      </div>
      <div className={cs.main}>
        <span className={cs.content}>백엔드 면접 질문 리스트</span>
      </div>
      <div className={cs.status}>
        <div className={cs.cntWrapper}>
          <Question />
          <span>121</span>
        </div>
        <div className={cs.cntWrapper}>
          <Members />
          <span>9</span>
        </div>
      </div>
    </div>
  );
};
