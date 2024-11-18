interface TitleProps {
  title: string;
  size?: number;
  color?: string;
}

export const Title = ({ title, size = 18, color = 'black' }: TitleProps) => {
  return (
    <div>
      <text style={{ fontSize: size, fontWeight: 'bold', color }}>{title}</text>
    </div>
  );
};
