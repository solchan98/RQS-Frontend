import { Button } from '@mui/material';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

interface IQuizGameButtonStyles {
  width?: number;
  height?: number;
  selected?: boolean;
}

interface IQuizGameButtonProps {
  width?: number;
  height?: number;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const QuizGameButton = ({ width = 120, height = 48, children, onClick }: IQuizGameButtonProps) => {
  const [selectedState, setSelectedState] = useState(true);

  return (
    <QuizGameButtonContainer width={width} height={height} selected={selectedState}>
      <Button type='button' onClick={onClick}>
        {children}
      </Button>
    </QuizGameButtonContainer>
  );
};

const QuizGameButtonContainer = styled.div<IQuizGameButtonStyles>`
  width: ${(props) => (props.width ? `${props.width}px` : '')}px;
  height: ${(props) => (props.height ? `${props.height}px` : '')}px;

  background: ${(props) => (props.selected ? 'primary' : 'white')};
`;
