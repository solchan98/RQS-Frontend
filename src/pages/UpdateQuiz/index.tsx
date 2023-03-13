import { AxiosError } from 'axios';
import { Editor } from '@toast-ui/react-editor';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useRef, useState } from 'react';

import { useLogout } from 'hooks/useLogout';
import { checkIsQuizCreator, deleteQuiz, getQuiz, updateQuiz } from 'service/quizzes';
import ToastEditor from 'components/ToastUI/Editor';
import { ICreateAnswer, IQuiz } from 'types/quiz';

import cx from 'classnames';
import cs from './updatequiz.module.scss';
import { MultiAnswer } from '../CreateQuiz/MultiAnswer';

export const UpdateQuiz = () => {
  const { quizId } = useParams();

  const [question, setQuestion] = useState('');
  const [initEditorValue, setInitEditorValue] = useState('');
  const onChangeQuestion: ChangeEventHandler<HTMLTextAreaElement> = (e) => setQuestion(e.currentTarget.value);
  const [type, setType] = useState('form');

  const [answers1, setAnswers1] = useState<ICreateAnswer>({ answer: '', isCorrect: false });
  const [answers2, setAnswers2] = useState<ICreateAnswer>({ answer: '', isCorrect: false });
  const [answers3, setAnswers3] = useState<ICreateAnswer>({ answer: '', isCorrect: false });
  const [answers4, setAnswers4] = useState<ICreateAnswer>({ answer: '', isCorrect: false });

  const editorRef = useRef<Editor>(null);

  const [hasAccessRole, setHasAccessRole] = useState(false);
  const onAccessible = (message: IMessage) => {
    const isCreator = message.message === '200';
    if (!isCreator) {
      nav(-1);
      alert('권한이 존재하지 않아 접근할 수 없습니다.');
      return;
    }
    getQuiz(Number(quizId)).then(onSuccessGetQuiz).catch(onError);
  };

  useQuery([`#quiz_${quizId}`], () => checkIsQuizCreator(Number(quizId)), {
    onSuccess: onAccessible,
    onError: (err: AxiosError<{ message: string }>) => onError(err),
  });

  const onSuccessGetQuiz = (quiz: IQuiz) => {
    setQuestion(quiz.question);
    setType(quiz.type);
    if (quiz.type === 'form') {
      setInitEditorValue(quiz.answerResponses[0].answer);
    } else {
      setAnswers1(quiz.answerResponses[0] ?? { answer: '', isCorrect: false });
      setAnswers2(quiz.answerResponses[1] ?? { answer: '', isCorrect: false });
      setAnswers3(quiz.answerResponses[2] ?? { answer: '', isCorrect: false });
      setAnswers4(quiz.answerResponses[3] ?? { answer: '', isCorrect: false });
    }
    setHasAccessRole((prev) => !prev);
  };

  const nav = useNavigate();
  const logout = useLogout();
  const onError = (err: AxiosError<{ message: string }>) => {
    console.log(err);
    if (err.response?.status === 401) {
      logout();
    } else {
      nav(-1);
      alert(err.response?.data.message);
    }
  };

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
  const updateQuizSuccessHandler = () => {
    nav(-1);
    alert('퀴즈가 업데이트되었습니다.');
  };

  const onSubmitUpdateQuiz: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    updateQuiz(Number(quizId), question, type, calAnswers(), '').then(updateQuizSuccessHandler).catch(onError);
  };

  const deleteQuizSuccessHandler = () => {
    nav(-1);
    alert('퀴즈가 삭제되었습니다.');
  };

  const [checkDelete, setCheckDelete] = useState(false);
  const onSubmitDeleteQuiz: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!checkDelete) {
      setCheckDelete((prev) => !prev);
    } else {
      deleteQuiz(Number(quizId)).then(deleteQuizSuccessHandler).catch(onError);
    }
  };

  const onClickExitBtn: MouseEventHandler<HTMLButtonElement> = () => nav(-1);

  if (!hasAccessRole) return <div>권한 확인중...</div>;

  return (
    <div className={cs.container}>
      <div className={cs.top}>Update Quiz</div>
      <form className={cs.main} id='updateQuiz' onSubmit={onSubmitUpdateQuiz}>
        <span className={cs.subTitle}>Question</span>
        <textarea value={question} className={cs.textArea} onChange={onChangeQuestion} />
        <span className={cs.subTitle}>Answer</span>
        {type === 'form' && (
          <ToastEditor ref={editorRef} placeHolder='답변을 입력하세요' initialContent={initEditorValue} />
        )}
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
        <form id='deleteQuiz' onSubmit={onSubmitDeleteQuiz}>
          <button className={cx(cs.button, cs.delete)} type='submit' form='deleteQuiz'>
            삭제하기
          </button>
          {checkDelete && <span className={cs.checkDelete}>한번더 누르면 삭제가 진행됩니다.</span>}
        </form>
        <div className={cs.sideBtnWrapper}>
          <button className={cs.button} type='button' onClick={onClickExitBtn}>
            돌아가기
          </button>
          <button className={cs.button} type='submit' form='updateQuiz'>
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
};
