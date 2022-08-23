import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useMemo, useState } from 'react';
import { useMount } from 'react-use';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';

import { memberState } from 'recoil/atoms/member';
import { itemListState } from 'recoil/atoms/items';
import { IItem } from 'types/item';

import cx from 'classnames';
import cs from './updateItem.module.scss';
import { updateSpaceItem } from '../../service/items';
import { useLogout } from '../../hooks/useLogout';

export const UpdateItem = () => {
  const { itemId } = useParams();
  const nav = useNavigate();

  const [itemListValue, setItemListValue] = useRecoilState(itemListState);
  const memberValue = useRecoilValue(memberState);

  const item = useMemo(() => {
    return itemListValue.itemList.find((i) => i.itemId === Number(itemId)) ?? ({} as IItem);
  }, [itemId, itemListValue.itemList]);

  useMount(() => {
    const isCreator = memberValue.email === item.spaceMemberResponse.email;
    if (!isCreator) {
      alert('권한이 존재하지 않아 페이지에 접근 불가능합니다.');
      nav(-1);
    }
  });

  const [question, setQuestion] = useState(item.question);
  const [questionIsEmpty, setQuestionIsEmpty] = useState(false);
  const onChangeQuestion: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.currentTarget.value.length !== 0 && questionIsEmpty) setQuestionIsEmpty(false);
    setQuestion(e.currentTarget.value);
  };
  const [answer, setAnswer] = useState(item.answer);
  const [answerIsEmpty, setAnswerIsEmpty] = useState(false);
  const onChangeAnswer: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.currentTarget.value.length !== 0 && answerIsEmpty) setAnswerIsEmpty(false);
    setAnswer(e.currentTarget.value);
  };
  const [hint, setHint] = useState('');
  const onChangeHint: ChangeEventHandler<HTMLInputElement> = (e) => setHint(e.currentTarget.value);

  const [hintList, setHintList] = useState<string[]>(item.hint.split(','));
  const onSubmitAddHint: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const exist = hintList.find((h) => h === hint);
    if (!exist) setHintList((prev) => [...prev, hint]);
    setHint('');
  };
  const onClickDeleteHint: MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.currentTarget.dataset.id;
    setHintList((prev) => prev.filter((h) => h !== target));
  };

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

  const logout = useLogout();

  const updateSpaceItemSuccessHandler = (data: IItem) => {
    const itemList = itemListValue.itemList.map((i) => (i.itemId === Number(itemId) ? data : i));
    setItemListValue((prev) => ({
      ...prev,
      itemList,
    }));
    alert('업데이트 성공 :)');
    nav(-1);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const check = checkDataIsEmpty();
    if (!check) return;
    updateSpaceItem(Number(itemId), question, answer, hintList)
      .then((data) => updateSpaceItemSuccessHandler(data))
      .catch((err) => {
        if (err.response.data.status === 401) {
          logout();
        } else {
          alert(err.response.data?.message ?? 'SERVER ERROR');
        }
      });
  };

  const onClickExitBtn: MouseEventHandler<HTMLButtonElement> = () => nav(-1);

  return (
    <div className={cs.container}>
      <div className={cs.top}>아이템 관리</div>
      <form className={cs.main} id='updateItem' onSubmit={onSubmit}>
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
        <div className={cs.buttonWrapper}>
          <button type='button' onClick={onClickExitBtn}>
            돌아가기
          </button>
          <button type='submit' form='updateItem'>
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
};
