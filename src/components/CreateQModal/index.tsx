import cx from 'classnames';
import { useSetRecoilState } from 'recoil';
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from 'react';

import { IItem } from 'types/item';
import { ModalTemplate } from '../ModalTemplate';
import { createSpaceItem } from 'service/items';
import { itemListState } from 'recoil/atoms/items';

import { Exit } from 'assets/svgs';
import cs from './createQModal.module.scss';
import { useLogout } from 'hooks/useLogout';

interface Props {
  useModal: { isOpen: boolean; openModal: () => void; closeModal: (handler: Function) => void };
  spaceInfo: { spaceId: number; spaceTitle: string; myRole: string };
}

export const CreateQModal = ({ useModal, spaceInfo }: Props) => {
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

  const setItemListValue = useSetRecoilState(itemListState);

  const createSpaceItemSuccessHandler = (data: IItem) => {
    setItemListValue((prev) => ({
      ...prev,
      itemList: [data, ...prev.itemList],
    }));
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
    createSpaceItem(spaceInfo.spaceId, question, answer, hintList)
      .then((data) => createSpaceItemSuccessHandler(data))
      .catch((err) => {
        if (err.response.data.status === 401) {
          logout();
        } else {
          alert(err.response.data?.message ?? 'SERVER ERROR');
        }
      });
    closeModal(closeModalHandler);
  };

  return (
    <ModalTemplate isOpen={isOpen} closeModal={() => closeModal(closeModalHandler)} portalClassName='createQuestion'>
      <div className={cs.container}>
        <div className={cs.top}>
          <span className={cs.spaceTitle}>{spaceInfo.spaceTitle}</span>
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
          <span className={cx(cs.subTitle, cs.bottomSubTitle)}>힌트로 사용할 키워드를 추가해보세요! (최대 5개 )</span>
          <form onSubmit={onSubmitAddHint}>
            <input
              disabled={hintList.length >= 5}
              className={cs.hintInput}
              placeholder={hintList.length >= 5 ? '더이상 추가할 수 없습니다.' : 'Ex) 보안'}
              value={hint}
              onChange={onChangeHint}
            />
          </form>
          <ul className={cs.hintList}>
            {hintList.map((h) => (
              <li key={h}>
                <button type='button' data-id={h} className={cs.hint} onClick={onClickDeleteHint}>
                  {h}
                </button>
              </li>
            ))}
          </ul>
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
