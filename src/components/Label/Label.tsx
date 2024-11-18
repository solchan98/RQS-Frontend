interface LabelProps {
  title: string;
  size?: number;
  color?: string;
}

export const Label = ({ title, size = 12, color = 'black' }: LabelProps) => {
  return (
    <div>
      <text style={{ fontSize: size, color }}>{title}</text>
    </div>
  );
};
