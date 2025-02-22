import React from 'react';
import { Alert, Text, View } from 'react-native';
import { IOnGoingQuizGameProps } from '@/(1app)/components/index.types';
import { router } from 'expo-router';
import { OnGoingGameStyles as styles } from '@/(1app)/components/OnGoingQuizGameCarousel/OnGoingGame.styles';
import { ProgressBar } from '../../../../../components/ProgressBar/ProgressBar';
import { useProgressBarState } from '../../../../../components/ProgressBar/useProgressBarState';
import { TouchButton } from '../../../../../components/TouchButton';

const OnGoingQuizGame = ({ data }: IOnGoingQuizGameProps) => {
  const { progressState } = useProgressBarState({
    current: data.submittedQuizCount + 1,
    totalCount: data.quizCount,
  });

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>현재 진행중인 게임이 없습니다.</Text>
      </View>
    );
  }

  const onPressOngoingQuiz = () => {
    Alert.alert(`${data.quizPackTitle}`, `게임을 이어서 진행하시겠습니까?`, [
      {
        text: '진행하기',
        onPress: () => router.push({ pathname: '/(1app)/(quizpacks)/(quizgame)', params: { quizGameId: data.id } }),
        style: 'cancel',
      },
      {
        text: '취소',
        onPress: () => {},
        style: 'destructive',
      },
    ]);
  };

  return (
    <TouchButton style={styles.container} onPress={() => onPressOngoingQuiz()}>
      <View style={styles.top}>
        <View style={{ flex: 5 }}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>
            {data.quizPackTitle}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.timeAgo}>5분전</Text>
        </View>
      </View>
      <View style={styles.middle}>
        <Text
          style={{ fontSize: 16, fontWeight: 'bold' }}
        >{`${progressState.current} / ${progressState.totalCount}`}</Text>
      </View>
      <View style={styles.bottom}>
        <View style={{ flex: 10, justifyContent: 'center' }}>
          <ProgressBar
            width={null}
            progressState={{ current: progressState.current, totalCount: progressState.totalCount }}
          />
        </View>
      </View>
    </TouchButton>
  );
};

export default OnGoingQuizGame;
