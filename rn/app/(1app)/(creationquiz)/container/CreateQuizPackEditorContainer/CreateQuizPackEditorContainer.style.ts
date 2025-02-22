import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../assets/colors';

export const CreateQuizPackEditorContainerStyle = StyleSheet.create({
  addTaskButtonContainer: {
    alignItems: 'center',
  },
  addTaskButtonWrapper: {
    alignItems: 'center',
    backgroundColor: Colors.BUTTON_BACKGROUND2,
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    width: 96,
  },
  container: {
    backgroundColor: Colors.BACKGROUND2,
    borderRadius: 12,
    justifyContent: 'center',
    padding: 12,
    width: '100%',
  },
});
