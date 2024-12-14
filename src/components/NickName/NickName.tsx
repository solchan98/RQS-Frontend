import { INickNameProps } from './NickName.types';

export const NickName = ({ name, size, color = 'black' }: INickNameProps) => {
  return (
    <div style={{ fontSize: `${size}px`, fontWeight: 'bold', color }}>
      <span>{name}</span>
    </div>
  );
};
