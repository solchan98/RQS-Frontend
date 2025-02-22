import { Alert, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Snackbar } from '@react-native-material/core';
import Tasks from '@/(1app)/(creationquiz)/components/Tasks/Tasks';
import { IAutoQuizTask } from '@/(1app)/(creationquiz)/index.types';
import CreateQuizPackEditorContainer from '@/(1app)/(creationquiz)/container/CreateQuizPackEditorContainer/CreateQuizPackEditorContainer';
import { router, useFocusEffect } from 'expo-router';
import { CreateQuizIndexStyles as styles } from '@/(1app)/(creationquiz)/index.styles';
import NoBounceScrollView from '../../../components/NoBounceScrollView/NoBounceScrollView';
import useSnackbar from '../../../hooks/useSnackbar';
import { commandCheckTask, queryAutoQuizTask } from '../../../apis/autoquiz';

const CreateQuiz = () => {
  const [autoQuizTaskState, setAutoQuizTaskState] = useState<IAutoQuizTask[]>([]);
  const { message: alertMessage, isActive, on: onAlert } = useSnackbar({ screenKey: 'quiz-create' });

  const onGetAutoQuizTaskFailCallback = (errorMessage: string) => {
    onAlert(errorMessage);
  };
  const onGetAutoQuizTask = () => {
    queryAutoQuizTask(['ADDED', 'PENDING_REVIEW', 'WAITING_TO_BE_PUBLISHED'], onGetAutoQuizTaskFailCallback).then(
      (result) => {
        setAutoQuizTaskState(result);
      },
    );
  };
  useFocusEffect(
    useCallback(() => {
      // 이 부분 화면에 다시 돌아올 때마다 실행
      onGetAutoQuizTask();

      return () => {
        // 화면을 떠날 때 실행 (선택 사항)
      };
    }, []),
  );

  const onCommandCheckTaskFailCallback = (errorMessage: string) => {
    onAlert(errorMessage);
  };
  const onPressCheckTask = async (taskId: number) => {
    commandCheckTask(taskId, onCommandCheckTaskFailCallback).then(() => {
      setAutoQuizTaskState((prev) => [...prev.filter((value) => value.taskId !== taskId)]);
    });
  };

  const onPressTask = (task: IAutoQuizTask) => {
    if (task.taskStatus === 'PENDING_REVIEW') {
      Alert.alert('작업 실패', `아래의 사유로 작업이 실패하였습니다.\n\n${task.description}`, [
        {
          text: '확인',
          style: 'cancel',
          onPress: () => onPressCheckTask(task.taskId),
        },
      ]);
      return;
    }

    if (task.taskStatus === 'WAITING_TO_BE_PUBLISHED') {
      Alert.alert('발행 필요', `${task.quizPackTitle}\n\n퀴즈팩 발행 페이지로 이동합니다.`, [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          style: 'cancel',
          onPress: () => router.push({ pathname: './(creationquiz)/(autoquizpack)', params: { taskId: task.taskId } }),
        },
      ]);
    }
  };

  return (
    <NoBounceScrollView style={styles.container} contentContainerStyle={{ gap: 24 }}>
      {isActive() && (
        <Snackbar
          message={alertMessage()}
          style={{
            position: 'absolute',
            top: '3%',
            left: '50%',
            transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
            width: '80%',
            zIndex: 999,
          }}
        />
      )}
      {/* 나의 바로생성 티켓 수 */}
      <View style={styles.topContainer}>
        <View style={styles.topTicketLabelContainer}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>나의 바로생성 티켓</Text>
          <Text style={{ fontSize: 12, color: '#1b1b1b' }}>매일 오전 00시 초기화 (하루 5개)</Text>
        </View>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>제한없음</Text>
      </View>
      {/* 생성 작업 중인 퀴즈팩 리스트 */}
      <Tasks
        onPress={onPressTask}
        data={autoQuizTaskState.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())}
      />
      <View style={styles.bodyContainer}>
        <CreateQuizPackEditorContainer />
      </View>
    </NoBounceScrollView>
  );
};

export default CreateQuiz;
