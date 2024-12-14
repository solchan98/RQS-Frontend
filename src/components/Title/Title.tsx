import { ITitleProps } from './Title.types';

export const Title = ({ title, size = 18, color = 'black' }: ITitleProps) => {
  return (
    <div>
      <span style={{ fontSize: size, fontWeight: 'bold', color }}>{title}</span>
    </div>
  );
};
