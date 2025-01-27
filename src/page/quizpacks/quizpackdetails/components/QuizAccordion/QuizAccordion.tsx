import { Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { QuizOption } from '../../../../../components/QuizOption/QuizOption';
import {
  QuizAccordionContainer,
  QuizAccordionContent,
  QuizAccordionContentAudit,
  QuizAccordionContentContainer,
  QuizAccordionOptions,
} from './QuizAccordion.styles';
import { IQuiz } from '../../../../../types/quizpacks';

interface IQuizAccordionProps {
  quiz: IQuiz;
}

export const QuizAccordion = ({ quiz }: IQuizAccordionProps) => {
  return (
    <QuizAccordionContainer>
      <QuizAccordionContentContainer expandIcon={<ExpandMoreIcon />} aria-controls='panel1-content' id='panel1-header'>
        <QuizAccordionContent>
          <Typography>{quiz.content}</Typography>
          <QuizAccordionContentAudit>24.12.22 / sol</QuizAccordionContentAudit>
        </QuizAccordionContent>
      </QuizAccordionContentContainer>
      <div style={{ width: '100%', height: '1px', backgroundColor: '#c6c6c6' }} />
      <QuizAccordionOptions>
        {quiz.options.map(({ optionId, content }) => (
          <QuizOption key={optionId} option={{ optionId, content }} onClickOption={() => null} />
        ))}
      </QuizAccordionOptions>
    </QuizAccordionContainer>
  );
};
