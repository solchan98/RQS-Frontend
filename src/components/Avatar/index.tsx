import { Link } from 'react-router-dom';

import cs from './avatar.module.scss';

const AVATAR = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

interface Props {
  memberId?: number;
  src?: string;
  width?: number;
  height?: number;
}

export const Avatar = ({ memberId, src = AVATAR, width = 36, height = 36 }: Props) => {
  return (
    <Link className={cs.avatar} to={`/${memberId}`}>
      <img style={{ width, height }} src={src} alt='profile_image' />
    </Link>
  );
};
