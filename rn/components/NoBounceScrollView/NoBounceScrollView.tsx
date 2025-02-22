import { ScrollView, ScrollViewProps } from 'react-native';

interface INoBounceScrollViewProps extends ScrollViewProps {
  children?: React.ReactNode; // 명시적으로 children 추가
}

const NoBounceScrollView: React.FC<INoBounceScrollViewProps> = ({ children, ...props }: INoBounceScrollViewProps) => (
  <ScrollView {...props} bounces={false} overScrollMode='never'>
    {children}
  </ScrollView>
);

export default NoBounceScrollView;
