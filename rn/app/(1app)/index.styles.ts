import { StyleSheet } from 'react-native';
import { Colors } from '../../assets/colors';

export const AppIndexStyles = StyleSheet.create({
  blockCalender: {
    backgroundColor: Colors.BACKGROUND2,
    height: 190,
    marginHorizontal: 12,
    marginVertical: 6,
  },
  container: {
    backgroundColor: Colors.BACKGROUND1,
    flex: 1,
  },
  onGoingQuizGames: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    marginVertical: 6,
    maxHeight: 160, // ,or 48
    minHeight: 160, // or 48
  },
  rowButtonContainer: {
    flexDirection: 'row',
    gap: 8,
    height: 84,
    justifyContent: 'center',
    marginBottom: 6,
    paddingHorizontal: 16,
    width: '100%',
  },
  rowButtonText: {
    color: Colors.BUTTON_TEXT1,
    fontSize: 16,
    fontWeight: 500,
  },
  rowButtonWrapper: {
    flex: 1,
  },

  topContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 72,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  topUserName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  topUserWrapper: { alignItems: 'center', flexDirection: 'row', gap: 8, justifyContent: 'center' },
});
