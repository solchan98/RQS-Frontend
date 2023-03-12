import { Link } from 'react-router-dom';
import { MouseEventHandler, useState } from 'react';

import cx from 'classnames';
import cs from './quizintro.module.scss';

export const QuizIntro = () => {
  const [quizType, setQuizType] = useState<string>('form');

  const onClickButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { id } = e.currentTarget.dataset;
    setQuizType(String(id));
  };

  return (
    <div className={cs.container}>
      <div className={cs.message}>진행하려는 방식을 선택 후 퀴즈를 시작해주세요!</div>
      <div className={cs.buttonWrapper}>
        <button
          className={cx(cs.button, quizType === 'form' && cs.active)}
          type='button'
          data-id='form'
          onClick={onClickButton}
        >
          주관식
        </button>
        <button
          className={cx(cs.button, quizType === 'multi' && cs.active)}
          type='button'
          data-id='multi'
          onClick={onClickButton}
        >
          4지 선다
        </button>
      </div>
      <Link className={cs.link} to='./form'>
        Let&apos;s Quiz
      </Link>
    </div>
  );
};
