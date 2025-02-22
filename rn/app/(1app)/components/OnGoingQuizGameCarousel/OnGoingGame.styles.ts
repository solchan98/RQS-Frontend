import { StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/colors';

export const OnGoingGameStyles = StyleSheet.create({
  bottom: {
    flex: 2,
    flexDirection: 'row',
    width: '100%',
  },
  container: {
    backgroundColor: Colors.BACKGROUND2,
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },

  middle: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  timeAgo: {
    fontSize: 14,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  top: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 36,
    minHeight: 36,
  },
});

export const OnGoingQuizGameCarouselStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  slide: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
});
