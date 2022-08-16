import { Cat } from '../../../../assets/svgs';
import { Link } from 'react-router-dom';

interface Props {
  size: number;
  color: string;
}

export const Logo = ({ size, color }: Props) => {
  return (
    <Link to='/' style={{ width: `${size}px`, height: `${size}px` }}>
      <Cat width={size} height={size} color={color} />
    </Link>
  );
};
