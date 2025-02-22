import { StyleSheet } from 'react-native';

export const QuizGameIndexStyles = StyleSheet.create({
  container: { alignItems: 'center', backgroundColor: '#f6f7f9', flex: 1 },
  errorContainer: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  errorText: { color: 'red', fontSize: 18, fontWeight: 'bold' },
  nextButtonContainer: {
    alignItems: 'center',
    backgroundColor: '#365eff',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    width: '30%',
  },

  nextButtonWrapper: {
    color: '#efefef',
    fontSize: 18,
    fontWeight: '500',
  },

  optionWrapper: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    maxHeight: 102,
    minHeight: 72,
    padding: 12,
    width: '100%',
  },
  optionsContainer: {
    alignItems: 'center',
    gap: 12,
    marginVertical: 12,
    width: '80%',
  },

  progressAreaContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 48,
    justifyContent: 'center',
    width: '100%',
  },
  progressAreaWrapper: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    flexDirection: 'row',
    gap: 12,
    height: 48,
    padding: 12,
    width: '80%',
  },

  progressBarWrapper: {
    flex: 1,
  },

  quizContainer: {
    marginVertical: 48,
    width: '80%',
  },

  quizWrapper: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
