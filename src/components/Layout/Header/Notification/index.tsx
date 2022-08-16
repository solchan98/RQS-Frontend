import { Link } from 'react-router-dom';
import { Noti } from '../../../../assets/svgs';

interface Props {
  size: number;
  color: string;
}

export const Notification = ({ size, color }: Props) => {
  return (
    <Link to='/' style={{ width: `${size}px`, height: `${size}px`, marginBottom: '-2px' }}>
      <Noti width={size} height={size} color={color} />
    </Link>
  );
};
