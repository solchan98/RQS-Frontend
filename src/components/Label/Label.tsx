import { ILabelProps } from './Label.types';

export const Label = ({ title, size = 12, color = 'black' }: ILabelProps) => {
  return (
    <div>
      <span style={{ fontSize: size, color }}>{title}</span>
    </div>
  );
};
