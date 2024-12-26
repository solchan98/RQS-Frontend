import { QuizOptionButton } from './QuizOption.styles';
import { useOptionState } from './useOptionState';
import { IQuizOptionProps } from './QuizOption.types';

export const QuizOption = ({ option, onClickOption }: IQuizOptionProps) => {
  const { selectedState, changeSelectedState } = useOptionState();

  return (
    <QuizOptionButton
      key={option.optionId}
      type='button'
      selected={selectedState}
      onClick={() => onClickOption(option.optionId, changeSelectedState)}
    >
      {option.content}
    </QuizOptionButton>
  );
};
