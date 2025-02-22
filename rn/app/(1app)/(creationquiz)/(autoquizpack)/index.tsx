import { Alert, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { IAutoQuiz, IAutoQuizPack } from '@/(1app)/(creationquiz)/index.types';
import { TextInput } from '@react-native-material/core';
import { Checkbox } from 'react-native-paper';
import {
  commandPublishAutoCreateQuizTask,
  commandUpdateAutoCreateQuizTask,
  queryAutoQuizPack,
} from '../../../../apis/autoquiz';
import useSnackbar from '../../../../hooks/useSnackbar';
import NoBounceScrollView from '../../../../components/NoBounceScrollView/NoBounceScrollView';
import { useMount } from '../../../../hooks/useMount';

/**
 * TODO
 *  - 퀴즈 검증 로직 추가
 *  - 임시 저장 로직 추가
 *  - 바로 발행 기능 추가
 *    - 발행
 *      1. 저장 call
 *      2. 발행 call
 */

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-around',
  },

  buttonWrapper: {
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    width: 100,
  },

  container: { backgroundColor: '#f6f7f9', flex: 1, gap: 12, padding: 12 },
  inputWrapper: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    minHeight: 72,
    padding: 12,
    width: '100%',
  },

  optionsContainer: {
    alignItems: 'center',
    gap: 12,
    padding: 12,
    width: '80%',
  },

  quizTitle: {
    width: '100%',
  },
  quizWrapper: {
    alignItems: 'center',
    borderWidth: 1,
    gap: 24,
    justifyContent: 'center',
    paddingVertical: 24,
    padding: 12,
    width: '100%',
  },
});

const AutoQuizPack = () => {
  const { taskId } = useLocalSearchParams();

  const [autoQuizPackState, setAutoQuizPackState] = useState<IAutoQuizPack>({
    quizzes: [] as IAutoQuiz[],
  } as IAutoQuizPack);
  const [quizIndexState, setQuizIndexState] = useState<number>(0);
  const { on: onAlert } = useSnackbar({ screenKey: 'quiz-create' });

  const onGetAutoQuizPackFailCallback = (errorMessage: string) => {
    router.back();
    onAlert(errorMessage); // quiz-create page
  };

  const onGetAutoQuizPack = () => {
    queryAutoQuizPack(Number(taskId), onGetAutoQuizPackFailCallback).then((result) => {
      setAutoQuizPackState(result);
    });
  };

  useMount(() => {
    onGetAutoQuizPack();
  });

  const onPressPrevQuiz = () => {
    if (quizIndexState <= 0) {
      return;
    }
    setQuizIndexState((prev) => prev - 1);
  };

  const onPressNextQuiz = () => {
    if (quizIndexState === autoQuizPackState.quizzes.length - 1) {
      return;
    }
    setQuizIndexState((prev) => prev + 1);
  };

  /* 오토 퀴즈팩 업데이트 핸들러 */
  const onChangeAutoQuizPackTitle = (newText: string) => {
    setAutoQuizPackState((prev) => ({ ...prev, title: newText }));
  };
  const onChangeAutoQuizContent = (quizIndex: number, newText: string) => {
    setAutoQuizPackState((prev) => {
      const newQuizzes = prev.quizzes;
      newQuizzes[quizIndex].content = newText;
      return { ...prev, quizzes: newQuizzes };
    });
  };
  const onChangeAutoQuizDescription = (quizIndex: number, newText: string) => {
    setAutoQuizPackState((prev) => {
      const newQuizzes = prev.quizzes;
      newQuizzes[quizIndex].description = newText;
      return { ...prev, quizzes: newQuizzes };
    });
  };
  const onChangeAutoQuizOptionCorrect = (quizIndex: number, optionId: number) => {
    setAutoQuizPackState((prev) => {
      const newQuizzes = prev.quizzes;
      const newOptions = newQuizzes[quizIndex].options;
      newOptions.filter((value) => value.id === optionId).forEach((value) => (value.correct = !value.correct));
      return { ...prev, quizzes: newQuizzes };
    });
  };

  const onSaveFailCallBack = (errorMessage: string) => {
    Alert.alert('저장 실패 ❌', errorMessage, [
      {
        text: '확인',
        style: 'cancel',
      },
    ]);
  };
  const onPublishFailCallBack = (errorMessage: string) => {
    Alert.alert('발행 실패 ❌', errorMessage, [
      {
        text: '확인',
        style: 'cancel',
      },
    ]);
  };
  const onPressSaveAndPublishButton = () => {
    commandUpdateAutoCreateQuizTask(autoQuizPackState, onSaveFailCallBack).then(() =>
      Alert.alert('저장 성공 👏', '오토 퀴즈팩 저장에 성공하였습니다. \n\n 발행을 진행하시겠습니까?', [
        {
          text: '확인',
          style: 'cancel',
          onPress: () =>
            commandPublishAutoCreateQuizTask(autoQuizPackState.id, onPublishFailCallBack).then((quizPackId) => {
              Alert.alert('발행 성공 ', '발행한 퀴즈팩으로 게임을 진행해보세요!', [
                {
                  text: '문제풀러가기',
                  style: 'cancel',
                  onPress: () => {
                    router.replace({ pathname: '(1app)/(quizpacks)', params: { quizPackId } });
                  },
                },
                {
                  text: '닫기',
                  style: 'default',
                  onPress: () => router.back(),
                },
              ]);
            }),
        },
        {
          text: '취소',
          style: 'default',
        },
      ]),
    );
  };

  if (autoQuizPackState.quizzes.length === 0) {
    return (
      <View>
        <Text>조회중</Text>
      </View>
    );
  }

  return (
    <NoBounceScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput style={styles.inputWrapper} onChangeText={onChangeAutoQuizPackTitle}>
            {autoQuizPackState.title}
          </TextInput>
          <Text>
            {quizIndexState + 1} / {autoQuizPackState.quizzes.length}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={quizIndexState === 0}
              style={[styles.buttonWrapper, quizIndexState === 0 && { backgroundColor: '#b3b3b3' }]}
              onPress={onPressPrevQuiz}
            >
              <Text style={{ color: 'white' }}>이전</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonWrapper, { backgroundColor: 'green' }]}
              onPress={onPressSaveAndPublishButton}
            >
              <Text style={{ color: 'white' }}>저장 후 발행</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={quizIndexState >= autoQuizPackState.quizzes.length - 1}
              style={[
                styles.buttonWrapper,
                quizIndexState >= autoQuizPackState.quizzes.length - 1 && { backgroundColor: '#b3b3b3' },
              ]}
              onPress={onPressNextQuiz}
            >
              <Text style={{ color: 'white' }}>다음</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.quizWrapper} key={autoQuizPackState.quizzes[quizIndexState]?.id}>
            <TextInput
              value={autoQuizPackState.quizzes[quizIndexState]?.content}
              onChangeText={(text) => onChangeAutoQuizContent(quizIndexState, text)}
              placeholder='퀴즈'
              style={[styles.quizTitle, styles.inputWrapper]}
              multiline
            />
            <TextInput
              value={autoQuizPackState.quizzes[quizIndexState]?.description}
              onChangeText={(text) => onChangeAutoQuizDescription(quizIndexState, text)}
              placeholder='퀴즈 해설'
              multiline
              style={[styles.quizTitle, styles.inputWrapper]}
            />
            {/* 옵션 리스트 */}
            <View style={styles.optionsContainer}>
              {autoQuizPackState.quizzes[quizIndexState]?.options.map((option) => (
                <View
                  style={{
                    width: '100%',
                    gap: 8,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  key={option.id}
                >
                  <View
                    style={{
                      backgroundColor: '#dddddd',
                      borderRadius: 8,
                    }}
                  >
                    <Checkbox.Item
                      label=''
                      rippleColor='transparent'
                      labelStyle={{ display: 'none' }}
                      style={{ padding: 0, margin: 0 }}
                      status={option.correct ? 'checked' : 'unchecked'}
                      onPress={() => onChangeAutoQuizOptionCorrect(quizIndexState, option.id)}
                    />
                  </View>
                  <TextInput multiline key={option.id} style={styles.inputWrapper}>
                    <Text
                      style={{
                        color: 'black',
                      }}
                      ellipsizeMode='tail'
                    >
                      {option.content}
                    </Text>
                  </TextInput>
                </View>
              ))}
            </View>
          </View>
          <View />
        </View>
      </TouchableWithoutFeedback>
    </NoBounceScrollView>
  );
};

export default AutoQuizPack;
