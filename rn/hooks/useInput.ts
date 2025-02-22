import { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

const useInput = () => {
  const [inputState, setInputState] = useState<string>('');

  const onChangeInput = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const { text } = e.nativeEvent;
    setInputState(text);
  };

  const clear = () => {
    setInputState('');
  };

  return { value: inputState, onChange: onChangeInput, clear };
};

export default useInput;
