import { IconType } from 'react-icons';

export interface IconProps {
  icon: IconType;
  size?: number;
  color?: string;
  onClick?: () => void;
}
