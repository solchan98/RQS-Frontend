import { AxiosError } from 'axios';
import { Editor } from '@toast-ui/react-editor';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useMemo, useRef, useState } from 'react';

import { useLogout } from 'hooks/useLogout';
import { checkIsQuizCreator, deleteQuiz, getQuiz, updateQuiz } from 'service/quizzes';
import ToastEditor from 'components/ToastUI/Editor';

import cx from 'classnames';
import cs from './updatequiz.module.scss';
import { IQuiz } from 'types/quiz';

export const UpdateQuiz = () => {
  const { quizId } = useParams();

  const [quizState, setQuizState] = useState<IQuiz>({} as IQuiz);
  const [questionIsEmpty, setQuestionIsEmpty] = useState(false);
  const onChangeQuestion: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { value } = e.currentTarget;
    if (value.length !== 0 && questionIsEmpty) setQuestionIsEmpty(false);
    setQuizState((prev) => ({ ...prev, question: value }));
  };

  const editorRef = useRef<Editor>(null);

  const hintList = useMemo(() => {
    return quizState.hint?.length === 0 ? [] : quizState.hint?.split(',');
  }, [quizState.hint]);

  const nav = useNavigate();
  const logout = useLogout();

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

  const onSuccessGetQuiz = ({ question, answer, hint, spaceId, spaceMemberResponse, createdAt }: IQuiz) => {
    setQuizState((prev) => ({
      ...prev,
      quizId: Number(quizId),
      question,
      answer,
      hint,
      spaceId,
      spaceMemberResponse,
      createdAt,
    }));
    editorRef.current?.getInstance().setMarkdown(answer);
    setHasAccessRole((prev) => !prev);
  };

  const onError = (err: AxiosError<{ message: string }>) => {
    if (err.response?.status === 401) {
      logout();
    } else {
      nav(-1);
      alert(err.response?.data.message);
    }
  };

  const [hint, setHint] = useState('');
  const onChangeHint: ChangeEventHandler<HTMLInputElement> = (e) => setHint(e.currentTarget.value);

  const onSubmitAddHint: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const exist = hintList?.find((h) => h === hint);
    if (!exist && hint.length !== 0) {
      const newHint = quizState.hint === '' ? hint : `${quizState.hint},${hint}`;
      setQuizState((prev) => ({ ...prev, hint: newHint }));
    }
    setHint('');
  };
  const onClickDeleteHint: MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.currentTarget.dataset.id;
    const changedHintState = hintList.filter((h) => h !== target).join(',');
    setQuizState((prev) => ({ ...prev, hint: changedHintState }));
  };

  const checkDataIsEmpty = (): boolean => {
    if (quizState.question.length === 0) {
      setQuestionIsEmpty(true);
      return false;
    }
    return true;
  };

  const updateQuizSuccessHandler = () => {
    nav(-1);
    alert('퀴즈가 업데이트되었습니다.');
  };
  const onSubmitUpdateQuiz: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!checkDataIsEmpty()) return;
    updateQuiz(
      Number(quizId),
      quizState.question,
      quizState.type,
      editorRef.current?.getInstance().getMarkdown() ?? '',
      quizState.hint
    )
      .then(updateQuizSuccessHandler)
      .catch(onError);
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
      <div className={cs.top}>아이템 관리</div>
      <form className={cs.main} id='updateQuiz' onSubmit={onSubmitUpdateQuiz}>
        <span className={cs.subTitle}>Question</span>
        <textarea
          value={quizState.question}
          className={cx(cs.textArea, questionIsEmpty && cs.isEmpty)}
          placeholder={questionIsEmpty ? '질문은 비어있으면 안됩니다!' : '질문을 작성하세요 :)'}
          onChange={onChangeQuestion}
        />
        <span className={cs.subTitle}>Answer</span>
        <ToastEditor ref={editorRef} placeHolder='답변을 입력하세요' initialContent={quizState.answer} />
      </form>
      <form className={cs.hintWrapper} onSubmit={onSubmitAddHint}>
        <span className={cx(cs.subTitle, cs.hintTitle)}>힌트로 사용할 키워드를 추가해보세요! (최대 5개 )</span>
        <input
          disabled={hintList.length >= 5}
          className={cs.hintInput}
          placeholder={hintList.length >= 5 ? '더이상 추가할 수 없습니다.' : 'Ex) 보안'}
          value={hint}
          onChange={onChangeHint}
        />
        <ul className={cs.hintList}>
          {hintList.map((h) => (
            <li key={h}>
              <button type='button' data-id={h} className={cs.hint} onClick={onClickDeleteHint}>
                {h}
              </button>
            </li>
          ))}
        </ul>
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
