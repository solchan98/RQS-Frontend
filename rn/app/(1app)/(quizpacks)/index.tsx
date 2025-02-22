import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Toggle from 'react-native-toggle-element';
import { useEffect, useState } from 'react';
import { Snackbar } from '@react-native-material/core';
import { IQuizPack } from '@/(1app)/(quizpacks)/index.types';
import QuizPackCard from '@/(1app)/(quizpacks)/components/QuizPackCard/QuizPackCard';
import { router } from 'expo-router';
import { QuizPacksIndexStyles as styles } from '@/(1app)/(quizpacks)/index.styles';
import useInput from '../../../hooks/useInput';
import { usePagination } from '../../../hooks/usePagination';
import useSnackbar from '../../../hooks/useSnackbar';
import { queryQuizPacks } from '../../../apis/quizpacks';
import { commandStartGameQuiz } from '../../../apis/quizgame';
import { useMount } from '../../../hooks/useMount';
import { TouchButton } from '../../../components/TouchButton';
import RoundBox from '../../../components/RoundBox/RoundBox';

const QuizPacks = () => {
  const { value: searchState, onChange: onSearchChange } = useInput();
  const [toggleValue, setToggleValue] = useState<boolean>(false); // false: mine, true: all

  const [quizPacksState, setQuizPacksState] = useState<IQuizPack[]>([]);
  const [quizPackLoadingState, setQuizPackLoadingState] = useState<boolean>(false);
  const { paginationState, setPaginationState } = usePagination(10);

  const { on: onAlert, isActive, message } = useSnackbar({ screenKey: 'quizpacks' });
  const onqueryQuizPacksFailCallback = (errorMessage: string) => {
    onAlert(errorMessage);
  };

  const loadQuizPacks = () => {
    if (paginationState.finish) {
      return;
    }

    setQuizPackLoadingState(true);
    queryQuizPacks(paginationState, toggleValue ? 'ALL' : 'MY', onqueryQuizPacksFailCallback).then((result) => {
      const lastQuizPack = result.slice(-1)[0];
      const finish = result.length < paginationState.chunk;
      setQuizPacksState((prev) => [...prev, ...result]);
      setQuizPackLoadingState(false);
      if (!lastQuizPack) {
        setPaginationState((prev) => ({ ...prev, finish }));
        return;
      }

      setPaginationState((prev) => ({ lastId: lastQuizPack.quizPackId, chunk: prev.chunk, finish }));
    });
  };

  useMount(() => {
    loadQuizPacks();
  });

  const onToggle = () => {
    setToggleValue((prev) => !prev);
    setPaginationState((prev) => ({ lastId: null, chunk: prev.chunk, finish: false }));
    setQuizPacksState([]);
  };

  useEffect(() => {
    const stateChangeCompletionForSearch =
      toggleValue !== null && paginationState.lastId === null && quizPacksState.length === 0;
    if (stateChangeCompletionForSearch) {
      loadQuizPacks();
    }
  }, [toggleValue]);
  const onStartGameFailHandler = (message: string) => {
    onAlert(message);
  };
  const onPressGameStart = (quizPackId: number) => {
    commandStartGameQuiz(Number(quizPackId), 'SEQUENCE_PICK', onStartGameFailHandler).then((result) => {
      router.push({ pathname: './(quizgame)', params: { quizGameId: result } });
    });
  };

  const onPressQuizPackCard = (quizPackId: number, title: string) => {
    Alert.alert('퀴즈팩', title, [
      {
        text: '게임 시작',
        style: 'cancel',
        onPress: () => onPressGameStart(quizPackId),
      },
      {
        text: '퀴즈팩 수정',
        style: 'default',
        onPress: () => Alert.alert('미제공 기능', '추후 개발 예정'),
      },
      {
        text: '닫기',
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {isActive() && (
        <Snackbar
          message={message()}
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
      {/* Toggle */}
      <View style={styles.toggleContainer}>
        <Toggle
          disabled={quizPackLoadingState}
          value={toggleValue}
          onPress={onToggle}
          leftComponent={
            <View style={{ opacity: 0.4 }}>
              <Text>Mine</Text>
            </View>
          }
          rightComponent={
            <View style={{ opacity: 0.4 }}>
              <Text>All</Text>
            </View>
          }
          trackBar={{
            width: 140,
            height: 40,
            radius: 16,
            inActiveBackgroundColor: '#ececec',
            activeBackgroundColor: '#ececec',
          }}
          thumbButton={{
            width: 75,
            height: 45,
          }}
          thumbStyle={{
            opacity: quizPackLoadingState ? 0.6 : 1,
            zIndex: 999,
            borderRadius: 16,
            backgroundColor: 'white',
          }}
          thumbActiveComponent={
            <View style={{ height: 45, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>All</Text>
            </View>
          }
          thumbInActiveComponent={
            <View style={{ height: 45, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>Mine</Text>
            </View>
          }
        />
      </View>
      {/* QuizPack list */}
      <ScrollView style={styles.quizPacksContainer}>
        {quizPacksState.map((value) => (
          <RoundBox key={value.quizPackId} style={styles.quizPackWrapper}>
            <TouchButton
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => onPressQuizPackCard(value.quizPackId, value.quizPackTitle)}
            >
              <QuizPackCard
                quizPackId={value.quizPackId}
                quizPackTitle={value.quizPackTitle}
                quizCount={value.quizCount}
                memberCount={value.memberCount}
                createdAt={value.createdAt}
              />
            </TouchButton>
          </RoundBox>
        ))}
      </ScrollView>
    </View>
  );
};

export default QuizPacks;
