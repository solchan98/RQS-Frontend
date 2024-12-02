import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const QuizCreateIntro = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button type='button' onClick={() => navigate('/new-quizzes/default')}>
        순서대로 생성
      </Button>
      <Button type='button' onClick={() => navigate('/new-quizzes/easy')}>
        자동 생성 (easy create)
      </Button>
    </>
  );
};
