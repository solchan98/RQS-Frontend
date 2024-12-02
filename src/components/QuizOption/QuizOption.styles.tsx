import styled from 'styled-components';
import { IQuizOptionStyles } from './QuizOption.types';

export const QuizOptionButton = styled.button<IQuizOptionStyles>`
  max-width: 80%;
  min-width: 80%;

  min-height: 48px;
  border-radius: 12px;

  border: 1px solid ${() => 'gray'};

  color: ${(props) => (props.selected ? '#FFFFFF' : '#2c2c2c')};
  background: ${(props) => (props.selected ? '#1E90FF' : '#E0E0E0')};

  transition:
    color 0.1s,
    background 0.1s;
`;
