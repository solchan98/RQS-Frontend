import { ChangeEventHandler, Dispatch, MouseEventHandler, SetStateAction } from 'react';

import { ICreateAnswer } from 'types/quiz';

import cx from 'classnames';
import cs from './multianswer.module.scss';

interface IProps {
  answer: ICreateAnswer;
  setAnswer: Dispatch<SetStateAction<ICreateAnswer>>;
}

export const MultiAnswer = ({ answer, setAnswer }: IProps) => {
  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    setAnswer((prev) => ({
      ...prev,
      answer: value,
    }));
  };

  const onChangeIsCorrect: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { id } = e.currentTarget.dataset;
    setAnswer((prev) => ({
      ...prev,
      isCorrect: Number(id) === 1,
    }));
  };

  return (
    <div className={cx(cs.container, answer.answer.length > 0 && cs.usingAnswer)}>
      <input value={answer.answer} onChange={onChangeInput} />
      <div className={cs.buttonWrapper}>
        <button className={cx(answer.isCorrect && cs.active)} type='button' data-id={1} onClick={onChangeIsCorrect}>
          정답
        </button>
        <button className={cx(!answer.isCorrect && cs.active)} type='button' data-id={0} onClick={onChangeIsCorrect}>
          오답
        </button>
      </div>
    </div>
  );
};
