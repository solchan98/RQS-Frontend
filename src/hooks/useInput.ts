import { ChangeEvent, useState } from 'react';

export const useInput = () => {
  const [inputState, setInputState] = useState<string>('');

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputState(value);
  };

  const clear = () => {
    setInputState('');
  };

  return { value: inputState, onChange: onChangeInput, clear };
};
