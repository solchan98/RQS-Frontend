import { StyleSheet } from 'react-native';
import { Styles } from '../../../../../assets/styles';
import { Colors } from '../../../../../assets/colors';

export const QuizPackCardStyles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: Colors.BACKGROUND2,
    flex: 1,
    gap: 6,
    padding: 12,
    width: '100%',
  },
  middleContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  title: {
    fontSize: Styles.FONT_SIZE5,
    fontWeight: 'bold',
    maxWidth: '100%',
    minWidth: '100%',
  },
  topContainer: {
    flexDirection: 'row',
    width: '100%',
  },
});
