import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useRef, useState } from 'react';
import ToastEditor from 'components/ToastUI/Editor';
import { Editor } from '@toast-ui/react-editor';
import { ICreateAnswer } from 'types/quiz';
import { createQuiz } from 'service/quizzes';
import { useNavigate, useParams } from 'react-router-dom';
import { useLogout } from 'hooks/useLogout';

import cx from 'classnames';
import cs from './createquiz.module.scss';
import { MultiAnswer } from './MultiAnswer';

export const CreateQuiz = () => {
  const { spaceId } = useParams();

  const [question, setQuestion] = useState('');
  const onChangeQuestion: ChangeEventHandler<HTMLTextAreaElement> = (e) => setQuestion(e.currentTarget.value);
  const [type, setType] = useState('form');

  const [answers1, setAnswers1] = useState<ICreateAnswer>({ answer: '', isCorrect: false });
  const [answers2, setAnswers2] = useState<ICreateAnswer>({ answer: '', isCorrect: false });
  const [answers3, setAnswers3] = useState<ICreateAnswer>({ answer: '', isCorrect: false });
  const [answers4, setAnswers4] = useState<ICreateAnswer>({ answer: '', isCorrect: false });

  const onChangeType: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { id } = e.currentTarget.dataset;
    setType(String(id));
  };

  const editorRef = useRef<Editor>(null);

  const nav = useNavigate();
  const logout = useLogout();

  const calAnswers = () => {
    if (type === 'form') {
      const data = {
        answer: editorRef.current?.getInstance().getMarkdown(),
        isCorrect: true,
      } as ICreateAnswer;
      return [data];
    }
    const answers: ICreateAnswer[] = [answers1, answers2, answers3, answers4];
    return answers.filter((answer) => answer.answer !== '');
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createQuiz(Number(spaceId), question, calAnswers(), type, [])
      .then(() => nav(`/space/${spaceId}`))
      .catch((err) => (err.response?.status === 401 ? logout() : alert(err.response?.data.message)));
  };

  return (
    <div className={cs.container}>
      <div className={cs.top}>
        <span className={cs.title}>Create Quiz</span>
      </div>
      <form id='createQuestion' className={cs.main} onSubmit={onSubmit}>
        <div className={cs.title}>
          <span className={cs.label}>Question</span>
          <textarea
            value={question}
            className={cs.question}
            placeholder='질문을 작성하세요 :)'
            onChange={onChangeQuestion}
          />
        </div>
        <div className={cs.typeWrapper}>
          <span className={cs.label}>Type</span>
          <div className={cs.typeBtnWrapper}>
            <button className={cx(type === 'form' && cs.active)} type='button' data-id='form' onClick={onChangeType}>
              주관식
            </button>
            <button className={cx(type === 'multi' && cs.active)} type='button' data-id='multi' onClick={onChangeType}>
              선다형
            </button>
          </div>
        </div>
        {type === 'form' && <ToastEditor ref={editorRef} placeHolder='답변을 작성하세요 :)' />}
        {type === 'multi' && (
          <ul className={cs.multiAnswerWrapper}>
            <MultiAnswer answer={answers1} setAnswer={setAnswers1} />
            <MultiAnswer answer={answers2} setAnswer={setAnswers2} />
            <MultiAnswer answer={answers3} setAnswer={setAnswers3} />
            <MultiAnswer answer={answers4} setAnswer={setAnswers4} />
          </ul>
        )}
      </form>
      <div className={cs.bottom}>
        <button type='submit' form='createQuestion'>
          생성하기
        </button>
      </div>
    </div>
  );
};
