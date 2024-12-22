import styled from 'styled-components';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

export const QuizAccordionContainer = styled(Accordion)`
  display: flex;
  flex-direction: column;

  border-radius: 12px !important;

  &::before {
    display: none;
  } !important
`;

export const QuizAccordionContentContainer = styled(AccordionSummary)`
  display: flex;
`;

export const QuizAccordionContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const QuizAccordionContentAudit = styled.span`
  padding-top: 8px;
  font-weight: 500;
  font-size: 14px;
`;

export const QuizAccordionOptions = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  padding: 16px !important;
`;
