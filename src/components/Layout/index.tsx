import { Link, Outlet } from 'react-router-dom';

import cs from './layout.module.scss';
import { useRecoilValue } from 'recoil';
import { memberState } from '../../recoil/atoms/member';

const AVATAR = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

export const Layout = () => {
  const { avatar } = useRecoilValue(memberState);

  return (
    <div className={cs.layout}>
      <div className={cs.profileWrapper}>
        <Link className={cs.avatar} to='#'>
          <img src={avatar ?? AVATAR} alt='profile_image' />
        </Link>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
