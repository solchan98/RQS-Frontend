import { IconProps } from './Icon.types';

export const Icon = ({ icon: IconComponent, size = 12, color = 'black' }: IconProps) => {
  return (
    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <IconComponent size={size} color={color} />
    </span>
  );
};
