import { AxiosError } from 'axios';
import { Editor } from '@toast-ui/react-editor';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useMemo, useRef, useState } from 'react';

import { useLogout } from 'hooks/useLogout';
import { checkIsItemCreator, deleteItem, getSpaceItem, updateSpaceItem } from 'service/items';
import ToastEditor from 'components/ToastUI/Editor';
import { IItem } from 'types/item';

import cx from 'classnames';
import cs from './updateItem.module.scss';

export const UpdateItem = () => {
  const { itemId } = useParams();

  const [itemState, setItemState] = useState<IItem>({} as IItem);
  const [questionIsEmpty, setQuestionIsEmpty] = useState(false);
  const onChangeQuestion: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { value } = e.currentTarget;
    if (value.length !== 0 && questionIsEmpty) setQuestionIsEmpty(false);
    setItemState((prev) => ({ ...prev, question: value }));
  };

  const editorRef = useRef<Editor>(null);

  const hintList = useMemo(() => {
    return itemState.hint?.length === 0 ? [] : itemState.hint?.split(',');
  }, [itemState.hint]);

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
    getSpaceItem(Number(itemId)).then(onSuccessGetItem).catch(onError);
  };

  useQuery([`#item_${itemId}`], () => checkIsItemCreator(Number(itemId)), {
    onSuccess: onAccessible,
    onError: (err: AxiosError<{ message: string }>) => onError(err),
  });

  const onSuccessGetItem = (item: IItem) => {
    const { question, answer, hint, spaceId, spaceMemberResponse, createdAt } = item;
    setItemState((prev) => ({
      ...prev,
      itemId: Number(itemId),
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
      const newHint = itemState.hint === '' ? hint : `${itemState.hint},${hint}`;
      setItemState((prev) => ({ ...prev, hint: newHint }));
    }
    setHint('');
  };
  const onClickDeleteHint: MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.currentTarget.dataset.id;
    const changedHintState = hintList.filter((h) => h !== target).join(',');
    setItemState((prev) => ({ ...prev, hint: changedHintState }));
  };

  const checkDataIsEmpty = (): boolean => {
    if (itemState.question.length === 0) {
      setQuestionIsEmpty(true);
      return false;
    }
    return true;
  };

  const updateSpaceItemSuccessHandler = () => {
    nav(-1);
    alert('아이템이 업데이트되었습니다.');
  };
  const onSubmitUpdateItem: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!checkDataIsEmpty()) return;
    updateSpaceItem(
      Number(itemId),
      itemState.question,
      editorRef.current?.getInstance().getMarkdown() ?? '',
      itemState.hint
    )
      .then(updateSpaceItemSuccessHandler)
      .catch(onError);
  };

  const deleteItemSuccessHandler = () => {
    nav(-1);
    alert('아이템이 삭제되었습니다.');
  };

  const [checkDelete, setCheckDelete] = useState(false);
  const onSubmitDeleteItem: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!checkDelete) {
      setCheckDelete((prev) => !prev);
    } else {
      deleteItem(Number(itemId)).then(deleteItemSuccessHandler).catch(onError);
    }
  };

  const onClickExitBtn: MouseEventHandler<HTMLButtonElement> = () => nav(-1);

  if (!hasAccessRole) return <div>권한 확인중...</div>;

  return (
    <div className={cs.container}>
      <div className={cs.top}>아이템 관리</div>
      <form className={cs.main} id='updateItem' onSubmit={onSubmitUpdateItem}>
        <span className={cs.subTitle}>Question</span>
        <textarea
          value={itemState.question}
          className={cx(cs.textArea, questionIsEmpty && cs.isEmpty)}
          placeholder={questionIsEmpty ? '질문은 비어있으면 안됩니다!' : '질문을 작성하세요 :)'}
          onChange={onChangeQuestion}
        />
        <span className={cs.subTitle}>Answer</span>
        <ToastEditor ref={editorRef} placeHolder='답변을 입력하세요' initialContent={itemState.answer} />
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
        <form id='deleteItem' onSubmit={onSubmitDeleteItem}>
          <button className={cx(cs.button, cs.delete)} type='submit' form='deleteItem'>
            삭제하기
          </button>
          {checkDelete && <span className={cs.checkDelete}>한번더 누르면 삭제가 진행됩니다.</span>}
        </form>
        <div className={cs.sideBtnWrapper}>
          <button className={cs.button} type='button' onClick={onClickExitBtn}>
            돌아가기
          </button>
          <button className={cs.button} type='submit' form='updateItem'>
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
};
