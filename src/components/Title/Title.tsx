import { ITitleProps } from './Title.types';

export const Title = ({ title, size = 18, color = 'black' }: ITitleProps) => {
  return (
    <div>
      <text style={{ fontSize: size, fontWeight: 'bold', color }}>{title}</text>
    </div>
  );
};
