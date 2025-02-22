import { Alert, Text, TouchableOpacity, View } from 'react-native';
import CreateQuizPackEditor from '@/(1app)/(creationquiz)/container/CreateQuizPackEditorContainer/CreateQuizPackEditor';
import React, { useRef } from 'react';
import { Buffer } from 'buffer';
import { CreateQuizPackEditorContainerStyle as styles } from '@/(1app)/(creationquiz)/container/CreateQuizPackEditorContainer/CreateQuizPackEditorContainer.style';
import useInput from '../../../../../hooks/useInput';
import { commandAddAutoCreateQuizTask } from '../../../../../apis/autoquiz';

const CreateQuizPackEditorContainer = () => {
  const { value: titleState, onChange: onTitleChange, clear: clearTitle } = useInput();
  const contentRef = useRef('');

  const onSubmitAddTaskFailHandler = (message: string) => {
    Alert.alert('요청 실패', message);
  };
  const onAddTaskPress = () => {
    if (titleState === null || titleState.length === 0) {
      Alert.alert('요청 실패', '퀴즈팩 타이틀은 필수입니다.');
      return;
    }
    if (contentRef.current === null || contentRef.current.length <= 0) {
      Alert.alert('요청 실패', '정리 내용은 필수입니다.');
      return;
    }
    const alertBody = `${titleState}\n\n 작업을 등록하시겠습니까?`;
    Alert.alert('생성요청', alertBody, [
      {
        text: '취소',
        onPress: () => {},
        style: 'default',
      },
      {
        text: '생성등록',
        onPress: () => {
          commandAddAutoCreateQuizTask(
            titleState,
            Buffer.from(contentRef.current, 'utf-8').toString('base64'),
            'text/plain',
            onSubmitAddTaskFailHandler,
          ).then((result) => {
            Alert.alert('요청 성공', `taskId : ${result.id}`);
            contentRef.current = '';
            clearTitle();
            // onGetAutoQuizTask();
          });
        },
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View>
        <CreateQuizPackEditor quizTitleState={titleState} onTitleChange={onTitleChange} contentRef={contentRef} />
      </View>
      <View style={styles.addTaskButtonContainer}>
        <TouchableOpacity onPress={onAddTaskPress} activeOpacity={0.6} style={styles.addTaskButtonWrapper}>
          <Text style={{ color: 'white' }}>생성요청</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateQuizPackEditorContainer;
