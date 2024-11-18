interface NickNameProps {
  name: string;
  size: number;
  color?: string;
}

export const NickName = ({ name, size, color = 'black' }: NickNameProps) => {
  return (
    <div style={{ fontSize: `${size}px`, fontWeight: 'bold', color }}>
      <text>{name}</text>
    </div>
  );
};
