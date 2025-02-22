import { StyleSheet } from 'react-native';
import { Colors } from '../../../assets/colors';

export const CreateQuizIndexStyles = StyleSheet.create({
  bodyContainer: {
    width: '100%',
  },
  container: {
    backgroundColor: Colors.BACKGROUND1,
    flex: 1,
    padding: 24,
  },

  topContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  topTicketLabelContainer: {
    gap: 2,
  },
});
