import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../assets/colors';

export const TasksStyles = StyleSheet.create({
  taskContainer: {
    backgroundColor: Colors.BACKGROUND2,
    borderRadius: 12,
    padding: 12,
    width: '100%',
  },
  taskWrapper: {
    backgroundColor: Colors.BACKGROUND1,
    borderRadius: 12,
    gap: 8,
    padding: 12,
    width: 220,
  },
});
