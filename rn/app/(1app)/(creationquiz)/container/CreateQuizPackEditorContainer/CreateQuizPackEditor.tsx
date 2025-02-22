import { KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { ICreateQuizPackEditorProps } from '@/(1app)/(creationquiz)/index.types';
import { TextInput } from '@react-native-material/core';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efefef',
    height: 490,
  },
  flatStyle: {
    paddingHorizontal: 12,
  },
});

const CreateQuizPackEditor = ({ quizTitleState, onTitleChange, contentRef }: ICreateQuizPackEditorProps) => {
  const richText = useRef<RichEditor>(null);
  const scrollRef = useRef<ScrollView>(null);

  const handleChange = (text: string) => {
    contentRef.current = text;
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          placeholder='생성하려는 퀴즈팩 타이틀을 입력하세요.'
          style={{ width: '100%' }}
          label='Quizpack Title'
          value={quizTitleState}
          onChange={onTitleChange}
        />
      </View>
      <StatusBar />
      <RichToolbar
        flatContainerStyle={styles.flatStyle}
        editor={richText}
        selectedIconTint='#2095F2'
        disabledIconTint='#bfbfbf'
      />
      <ScrollView keyboardDismissMode='none' ref={scrollRef} nestedScrollEnabled scrollEventThrottle={20}>
        <RichEditor
          initialFocus={false}
          firstFocusEnd={false}
          ref={richText}
          useContainer
          initialHeight={400}
          enterKeyHint='done'
          placeholder='please input content'
          onChange={handleChange}
          pasteAsPlainText
        />
      </ScrollView>
      <KeyboardAvoidingView>
        <RichToolbar
          flatContainerStyle={styles.flatStyle}
          editor={richText}
          selectedIconTint='#2095F2'
          disabledIconTint='#bfbfbf'
          actions={[actions.undo, actions.redo]}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateQuizPackEditor;
