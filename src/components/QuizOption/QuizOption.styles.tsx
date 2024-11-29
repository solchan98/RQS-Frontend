import styled from 'styled-components';
import { IQuizOptionStyles } from './QuizOption.types';

export const QuizOptionButton = styled.button<IQuizOptionStyles>`
  max-width: 80%;
  min-width: 80%;

  border: 1px solid ${() => 'gray'};

  color: ${(props) => (props.selected ? 'white' : 'black')};
  background: ${(props) => (props.selected ? 'green' : 'white')};
`;
