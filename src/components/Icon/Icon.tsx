import { IconType } from 'react-icons';

interface IconProps {
  icon: IconType;
  size?: number;
  color?: string;
}

export const Icon = ({
  icon: IconComponent,
  size = 12,
  color = 'black',
}: IconProps) => {
  return (
    <span>
      <IconComponent size={size} color={color} />
    </span>
  );
};
