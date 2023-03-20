import { useMount } from 'react-use';
import { Editor } from '@toast-ui/react-editor';
import ToastEditor from 'components/ToastUI/Editor';
import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEventHandler, FormEventHandler, useRef, useState } from 'react';

import { useLogout } from 'hooks/useLogout';
import { ICreateAnswer, IQuiz } from 'types/quiz';
import { createChildQuiz, getQuiz } from 'service/quizzes';
import { MultiAnswer } from '../CreateQuiz/MultiAnswer';

import cx from 'classnames';
import cs from '../CreateQuiz/createquiz.module.scss';

export const CreateChildQuiz = () => {
  const { spaceId, parentId } = useParams();
  const [parentQuiz, setParentQuiz] = useState({} as IQuiz);

  const [question, setQuestion] = useState('');
  const onChangeQuestion: ChangeEventHandler<HTMLTextAreaElement> = (e) => setQuestion(e.currentTarget.value);

  const nav = useNavigate();
  const logout = useLogout();
  useMount(() => {
    getQuiz(Number(parentId))
      .then(setParentQuiz)
      .catch((err) => (err.response?.status === 401 ? logout() : alert(err.response?.data.message)));
  });

  const [answers1, setAnswers1] = useState<ICreateAnswer>({ answer: '', isCorrect: false });
  const [answers2, setAnswers2] = useState<ICreateAnswer>({ answer: '', isCorrect: false });
  const [answers3, setAnswers3] = useState<ICreateAnswer>({ answer: '', isCorrect: false });
  const [answers4, setAnswers4] = useState<ICreateAnswer>({ answer: '', isCorrect: false });

  const editorRef = useRef<Editor>(null);
  const calAnswers = () => {
    if (parentQuiz.type === 'form') {
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
    createChildQuiz(Number(spaceId), Number(parentId), question, calAnswers(), parentQuiz.type, [])
      .then(() => nav(`/space/${spaceId}`))
      .catch((err) => (err.response?.status === 401 ? logout() : alert(err.response?.data.message)));
  };

  return (
    <div className={cs.container}>
      <div className={cs.top}>
        <span className={cs.title}>Create Child Quiz</span>
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
            <button disabled className={cx(parentQuiz.type === 'form' && cs.active)} type='button' data-id='form'>
              주관식
            </button>
            <button disabled className={cx(parentQuiz.type === 'multi' && cs.active)} type='button' data-id='multi'>
              선다형
            </button>
          </div>
        </div>
        {parentQuiz.type === 'form' && <ToastEditor ref={editorRef} placeHolder='답변을 작성하세요 :)' />}
        {parentQuiz.type === 'multi' && (
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
