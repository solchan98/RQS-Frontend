import { Logo } from './Logo';
import { Link } from 'react-router-dom';

import cs from './header.module.scss';
import { Notification } from './Notification';

export const Header = () => {
  return (
    <header className={cs.layoutHeader}>
      <div>
        <Logo size={42} color='#000' />
        <form>
          <input />
          서치바
        </form>
        <div className={cs.profileSection}>
          <Notification size={24} color='#b4b4b4' />
          <Link to='#'>
            <img
              className={cs.avatar}
              src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              alt='profile_img'
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
