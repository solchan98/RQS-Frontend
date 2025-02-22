import { StyleSheet } from 'react-native';
import { Colors } from '../../../assets/colors';

export const QuizPacksIndexStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BACKGROUND1,
    flex: 1,
    gap: 12,
  },
  quizPackWrapper: {
    flex: 1,
    marginBottom: 12,
    overflow: 'hidden',
  },
  quizPacksContainer: {
    flex: 1,
    gap: 12,
    marginTop: 8,
    paddingHorizontal: 24,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 12,
    paddingLeft: 24,
  },
});
