import { QuizOptionButton } from './QuizOption.styles';
import { IAnswer } from '../../page/game';
import { useOptionState } from './useOptionState';

export interface IQuizOptionProps {
  answer: IAnswer;
  onClickOption: (answerId: number, callback: () => void) => void;
}

export const QuizOption = ({ answer, onClickOption }: IQuizOptionProps) => {
  const { selectedState, changeSelectedState } = useOptionState();

  return (
    <QuizOptionButton
      key={answer.id}
      type='button'
      selected={selectedState}
      onClick={() => onClickOption(answer.id, changeSelectedState)}
    >
      {answer.content}
    </QuizOptionButton>
  );
};
