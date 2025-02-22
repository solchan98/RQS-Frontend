import { Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Snackbar } from '@react-native-material/core';
import OnGoingQuizGameCarousel from '@/(1app)/components/OnGoingQuizGameCarousel/OnGoingQuizGameCarousel';
import { Ionicons } from '@expo/vector-icons';
import { IOnGoingGame } from '@/(1app)/components/index.types';
import { AppIndexStyles as styles } from '@/(1app)/index.styles';
import { router, useFocusEffect } from 'expo-router';
import { BlockCalender } from '../../components/BlockCalender/BlockCalender';
import RoundBox from '../../components/RoundBox/RoundBox';
import { queryContributions, queryOnGoingQuizGames } from '../../apis/quizgame';

import useUserInfo from '../../hooks/useUserInfo';
import useSnackbar from '../../hooks/useSnackbar';

import { IContributions } from '../../components/BlockCalender/BlockCalender.types';
import { TouchButton } from '../../components/TouchButton';
import { Colors } from '../../assets/colors';

const Home = () => {
  const { userInfo } = useUserInfo();

  const [contributionState, setContributionState] = useState<IContributions[]>([]);
  const [onGoingQuizGamesState, setOnGoingQuizGamesState] = useState<IOnGoingGame[]>([]);
  const { message: alertMessage, isActive, on: onAlert } = useSnackbar({ screenKey: 'home' });

  const onGetContributionsFailCallback = (message: string) => {
    onAlert(message);
  };
  const onGetOnGoingQuizGamesFailCallback = (message: string) => {
    onAlert(message);
  };

  useFocusEffect(
    useCallback(() => {
      // 이 부분 화면에 다시 돌아올 때마다 실행
      queryContributions(onGetContributionsFailCallback).then((result) => setContributionState(result));
      queryOnGoingQuizGames(onGetOnGoingQuizGamesFailCallback).then((result) => setOnGoingQuizGamesState(result));

      return () => {
        // 화면을 떠날 때 실행 (선택 사항)
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      {isActive() && (
        <Snackbar
          message={alertMessage()}
          style={{
            position: 'absolute',
            bottom: '3%',
            left: '50%',
            transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
            width: '80%',
            zIndex: 999,
          }}
        />
      )}
      <View style={styles.topContainer}>
        <View style={styles.topUserWrapper}>
          <Text style={styles.topUserName}>Hello, {userInfo().name}?</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name='notifications' size={24} color='gray' />
        </TouchableOpacity>
      </View>
      {/* 퀴즈 생성 및 탐색 버튼 */}
      <View style={styles.rowButtonContainer}>
        <View style={styles.rowButtonWrapper}>
          <TouchButton
            style={{ flex: 1, backgroundColor: Colors.BACKGROUND2 }}
            onPress={() => router.push('/(1app)/(creationquiz)')}
          >
            <Text style={styles.rowButtonText}>퀴즈 바로생성</Text>
          </TouchButton>
        </View>
        <View style={styles.rowButtonWrapper}>
          <TouchButton
            style={{ flex: 1, backgroundColor: Colors.BACKGROUND2 }}
            onPress={() => router.push('/(1app)/(quizpacks)')}
          >
            <Text style={styles.rowButtonText}>퀴즈팩 탐색</Text>
          </TouchButton>
        </View>
      </View>
      {/* 진행중인 게임 */}
      <RoundBox style={styles.onGoingQuizGames}>
        <OnGoingQuizGameCarousel data={onGoingQuizGamesState} emptyMessage='현재 진행중인 퀴즈가 없습니다.' />
      </RoundBox>
      {/* 잔디 */}
      <RoundBox style={styles.blockCalender}>
        <BlockCalender data={contributionState} />
      </RoundBox>
    </View>
  );
};

export default Home;
