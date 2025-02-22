import { Alert, LayoutAnimation, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { IGameQuiz } from '@/(1app)/(quizpacks)/(quizgame)/index.types';
import { Snackbar } from '@react-native-material/core';
import { AntDesign } from '@expo/vector-icons';
import { QuizGameIndexStyles as styles } from '@/(1app)/(quizpacks)/(quizgame)/index.styles';
import useGesturesEnabled from '../../../../hooks/useGesturesEnabled';
import { commandNextGameQuiz, commandSubmitGameQuiz } from '../../../../apis/quizgame';
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar';
import { useProgressBarState } from '../../../../components/ProgressBar/useProgressBarState';
import useSnackbar from '../../../../hooks/useSnackbar';
import { useMount } from '../../../../hooks/useMount';

const QuizGamePlay = () => {
  useGesturesEnabled();

  const [gameQuizState, setGameQuizState] = useState<IGameQuiz | null>(null);
  const { quizGameId } = useLocalSearchParams();
  const [selectedOptionsState, setSelectedOptionsState] = useState<number[]>([]);

  const onOptionToggle = (optionId: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (selectedOptionsState.includes(optionId)) {
      setSelectedOptionsState((prev) => [...prev.filter((value) => value !== optionId)]);
      return;
    }
    setSelectedOptionsState((prev) => [...prev, optionId]);
  };

  const { progressState, updateProgressState } = useProgressBarState({ current: 0, totalCount: 0 });

  const [errorState, setErrorState] = useState<{ state: boolean; message: string; remainSecond: number }>({
    state: false,
    message: '',
    remainSecond: 0,
  });
  const { isActive, message: alertMessage, on: onAlert } = useSnackbar({ screenKey: 'quiz-game-play' });

  const onGetNextQuizFailCallback = (errorMessage: string) => {
    setErrorState(() => ({ state: true, message: errorMessage, remainSecond: 3 }));
    setTimeout(() => {
      setErrorState((prev) => ({ ...prev, remainSecond: prev.remainSecond - 1 }));
    }, 1000);
    setTimeout(() => {
      setErrorState((prev) => ({ ...prev, remainSecond: prev.remainSecond - 1 }));
    }, 2000);
    setTimeout(() => {
      router.back();
    }, 3000);
  };
  const onGetNextQuiz = () => {
    commandNextGameQuiz(quizGameId as string, onGetNextQuizFailCallback).then((result) => {
      setGameQuizState(result);
      updateProgressState({ current: result.submittedQuizCount + 1, totalCount: result.totalQuizCount });
    });
  };
  const onSubQuizFailCallback = (errorMessage: string) => {
    onAlert(errorMessage);
  };
  const onSubmitQuiz = () => {
    commandSubmitGameQuiz(quizGameId as string, selectedOptionsState, onSubQuizFailCallback).then(() => {
      setSelectedOptionsState(() => []);
      if (progressState.current === progressState.totalCount) {
        Alert.alert('게임 완료', '게임이 종료되었습니다.', [{ text: '확인', onPress: () => router.back() }], {
          cancelable: false,
        });
        return;
      }
      onGetNextQuiz();
    });
  };

  useMount(() => {
    onGetNextQuiz();
  });

  const onPressExit = () => {
    Alert.alert('퀴즈게임', '게임을 종료하고 나가시겠습니까?\n게임은 다시 진행이 가능합니다.', [
      {
        text: '취소',
        onPress: () => {},
        style: 'default',
      },
      {
        text: '게임 나가기',
        onPress: () => router.back(),
        style: 'cancel',
      },
    ]);
  };

  if (errorState.state) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorState.message}</Text>
        <Text style={styles.errorText}>{errorState.remainSecond}초 뒤에 돌아갑니다.</Text>
      </View>
    );
  }

  if (gameQuizState === null) {
    return (
      <View style={styles.container}>
        <Text>조회중</Text>
      </View>
    );
  }

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
      <View style={{ width: '100%', alignItems: 'flex-end', marginRight: 12 }}>
        <TouchableOpacity onPress={() => onPressExit()} style={{ width: 32, padding: 4 }}>
          <AntDesign name='close' size={24} color='black' />
        </TouchableOpacity>
      </View>
      {/* 상단 프로그레스바 */}
      <View style={styles.progressAreaContainer}>
        <View style={styles.progressAreaWrapper}>
          <View style={styles.progressBarWrapper}>
            <ProgressBar
              styles={{
                backgroundColor: '#d1d1d3',
                borderWidth: 0,
                borderColor: 'transparent',
                borderRadius: 12,
              }}
              height={12}
              width={null}
              progressState={progressState}
            />
          </View>
          <Text style={{ fontWeight: 'bold' }}>
            {progressState.current}/{progressState.totalCount}
          </Text>
        </View>
      </View>
      {/* 퀴즈 타이틀 */}
      <View style={styles.quizContainer}>
        <Text style={styles.quizWrapper}>{gameQuizState.quiz.content}</Text>
      </View>
      {/* 옵션 리스트 */}
      <View style={styles.optionsContainer}>
        {gameQuizState.quiz.options.map((option) => (
          <TouchableOpacity
            key={option.optionId}
            style={[
              styles.optionWrapper,
              { backgroundColor: selectedOptionsState.includes(option.optionId) ? 'blue' : '#f0f0f0' },
            ]}
            onPress={() => onOptionToggle(option.optionId)}
          >
            <Text
              style={{ color: selectedOptionsState.includes(option.optionId) ? 'white' : 'black' }}
              ellipsizeMode='tail'
            >
              {option.content}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        disabled={selectedOptionsState.length === 0}
        style={[styles.nextButtonContainer, selectedOptionsState.length === 0 && { opacity: 0.5 }]}
        onPress={() => onSubmitQuiz()}
      >
        <Text style={styles.nextButtonWrapper}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuizGamePlay;
