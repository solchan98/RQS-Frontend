import { RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from 'react';

import { createSpaceItem } from 'service/items';
import { useLogout } from 'hooks/useLogout';
import { ISpace } from 'types/space';
import { ModalTemplate } from 'components/ModalTemplate';

import { Exit } from 'assets/svgs';
import cx from 'classnames';
import cs from './createQModal.module.scss';

interface Props {
  useModal: { isOpen: boolean; openModal: () => void; closeModal: (handler: Function) => void };
  space: ISpace;
  refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => void;
}

export const CreateQModal = ({ useModal, space, refetch }: Props) => {
  const [hint, setHint] = useState('');
  const onChangeHint: ChangeEventHandler<HTMLInputElement> = (e) => setHint(e.currentTarget.value);

  const [hintList, setHintList] = useState<string[]>([]);
  const onSubmitAddHint: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const exist = hintList.find((item) => item === hint);
    if (!exist) setHintList((prev) => [...prev, hint]);
    setHint('');
  };
  const onClickDeleteHint: MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.currentTarget.dataset.id;
    setHintList((prev) => prev.filter((item) => item !== target));
  };

  const [question, setQuestion] = useState('');
  const [questionIsEmpty, setQuestionIsEmpty] = useState(false);
  const [answer, setAnswer] = useState('');
  const [answerIsEmpty, setAnswerIsEmpty] = useState(false);
  const onChangeQuestion: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.currentTarget.value.length !== 0 && questionIsEmpty) {
      setQuestionIsEmpty(false);
    }
    setQuestion(e.currentTarget.value);
  };
  const onChangeAnswer: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.currentTarget.value.length !== 0 && answerIsEmpty) {
      setAnswerIsEmpty(false);
    }
    setAnswer(e.currentTarget.value);
  };

  const { isOpen, closeModal } = useModal;
  const closeModalHandler = () => {
    setHint('');
    setHintList([]);
    setQuestion('');
    setAnswer('');
    setQuestionIsEmpty(false);
    setAnswerIsEmpty(false);
  };

  const logout = useLogout();

  const checkDataIsEmpty = (): boolean => {
    if (question.length === 0) {
      setQuestionIsEmpty(true);
      return false;
    }
    if (answer.length === 0) {
      setAnswerIsEmpty(true);
      return false;
    }
    return true;
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const check = checkDataIsEmpty();
    if (!check) return;
    createSpaceItem(space.spaceId, question, answer, hintList)
      .then(() => refetch())
      .catch((err) => (err.response?.status === 401 ? logout() : alert(err.response?.data.message)));
    closeModal(closeModalHandler);
  };

  return (
    <ModalTemplate isOpen={isOpen} closeModal={() => closeModal(closeModalHandler)} portalClassName='createQuestion'>
      <div className={cs.container}>
        <div className={cs.top}>
          <span className={cs.spaceTitle}>{space.title}</span>
          <button type='button' className={cs.exit} onClick={() => closeModal(closeModalHandler)}>
            <Exit />
          </button>
        </div>
        <form id='createQuestion' className={cs.main} onSubmit={onSubmit}>
          <span className={cs.subTitle}>Question</span>
          <textarea
            value={question}
            className={cx(cs.textArea, questionIsEmpty && cs.isEmpty)}
            placeholder={questionIsEmpty ? '질문은 비어있으면 안됩니다!' : '질문을 작성하세요 :)'}
            onChange={onChangeQuestion}
          />
          <span className={cs.subTitle}>Answer</span>
          <textarea
            value={answer}
            className={cx(cs.textArea, cs.answerTextArea, answerIsEmpty && cs.isEmpty)}
            placeholder={answerIsEmpty ? '답변은 비어있으면 안됩니다!' : '답변을 작성하세요 :)'}
            onChange={onChangeAnswer}
          />
        </form>
        <div className={cs.bottom}>
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
          <div className={cs.createQBtnWrapper}>
            <button className={cs.createQBtn} type='submit' form='createQuestion'>
              생성하기
            </button>
          </div>
        </div>
      </div>
    </ModalTemplate>
  );
};