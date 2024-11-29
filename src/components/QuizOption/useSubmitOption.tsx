import { useState } from 'react';
import { IUseSubmitOption } from './QuizOption.types';

export const useSubmitOption = (): IUseSubmitOption => {
  const [submitOptionState, setSubmitOptionState] = useState<Set<number>>(new Set());

  const clearSubmitOption = () => {
    setSubmitOptionState(new Set());
  };

  const onClickOption = (answerId: number, callback: () => void) => {
    setSubmitOptionState((prev) => {
      const newState = new Set(prev);

      if (!prev.has(answerId)) {
        newState.add(answerId);
      } else {
        newState.delete(answerId);
      }

      return newState;
    });
    callback();
  };

  return { submitOptions: submitOptionState, onClickOption, clearSubmitOption };
};
