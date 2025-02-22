import { Text, View } from 'react-native';
import { IQuizPackCardProps } from '@/(1app)/(quizpacks)/index.types';
import { QuizPackCardStyles as styles } from '@/(1app)/(quizpacks)/components/QuizPackCard/QuizPackCard.styles';

const QuizPackCard = ({ quizPackId, quizPackTitle, quizCount, memberCount, createdAt }: IQuizPackCardProps) => (
  <View style={styles.container}>
    <View style={styles.topContainer}>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>
        {quizPackTitle}
      </Text>
    </View>
    <View style={styles.middleContainer}>
      <Text style={styles.bold}>{quizCount}</Text>
      <Text>개의 퀴즈를 </Text>
      <Text style={styles.bold}>{memberCount}</Text>
      <Text>명이 함께하고있어요!</Text>
    </View>
    <View>
      <Text>5분전</Text>
    </View>
  </View>
);

export default QuizPackCard;
