import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface IHeaderBackButtonProps {
  onPress: () => void;
}

const HeaderBackButton = ({ onPress }: IHeaderBackButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <MaterialIcons name='arrow-back-ios' size={24} color='black' />
  </TouchableOpacity>
);

export default HeaderBackButton;
