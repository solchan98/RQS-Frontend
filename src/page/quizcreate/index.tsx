import { TextField } from '@mui/material';
import React from 'react';
import { QuizAutoCreateContainer } from './index.styles';
import { ChipsArray } from '../../components/ChipsArray/ChipsArray';
import { useChipsArray } from '../../components/ChipsArray/useChipsArray';
import { useInput } from '../../hooks/useInput';
import { addAutoQuizCreateTask } from '../../api/quizpacks';
import { useErrorRequest } from '../../hooks/useErrorRequest';

export const QuizAutoCreate = () => {
  const { value: chipInput, onChange: onChipChangeInput, clear: clearChipInput } = useInput();
  const { chipsState, onAdd, onDelete } = useChipsArray();
  const [isComposing, setIsComposing] = React.useState(false);

  const { setErrorState } = useErrorRequest();

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addAutoQuizCreateTask(chipsState, setErrorState, () => {}).then((result) => {
      if (result === 0) {
        return;
      }
      alert(`{${result}} 작업 등록이 완료되었습니다.`);
    });
  };

  return (
    <QuizAutoCreateContainer>
      <TextField helperText='Please enter quiz pack title' id='demo-helper-text-misaligned' label='QuizPack Title' />
      <ChipsArray chips={chipsState} onDelete={onDelete} />
      <TextField
        helperText='Please enter keywords'
        id='demo-helper-text-misaligned'
        label='QuizPack Title'
        value={chipInput}
        onChange={onChipChangeInput}
        disabled={chipsState.length >= 3}
        onCompositionStart={() => setIsComposing(true)} // 한글 입력 시작
        onCompositionEnd={() => setIsComposing(false)} // 한글 입력 완료
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !isComposing) {
            onAdd({ key: null, label: chipInput });
            clearChipInput();
          }
        }}
      />
      <button type='submit' onClick={onSubmit}>
        퀴즈 생성 등록하기
      </button>
    </QuizAutoCreateContainer>
  );
};
