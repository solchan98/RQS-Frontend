import cx from 'classnames';

import { Exit } from '../../assets/svgs';

import cs from './createQModal.module.scss';
import { ModalTemplate } from '../ModalTemplate';
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from 'react';

interface Props {
  useModal: { isOpen: boolean; openModal: () => void; closeModal: (handler: Function) => void };
  spaceInfo: { spaceTitle: string; myRole: string };
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

  const { isOpen, closeModal } = useModal;
  const handleCloseModal = () => {
    setHint('');
    setHintList([]);
  };

  return (
    <ModalTemplate isOpen={isOpen} closeModal={() => closeModal(handleCloseModal)} portalClassName='createQuestion'>
      <div className={cs.container}>
        <div className={cs.top}>
          <span className={cs.spaceTitle}>{spaceInfo.spaceTitle}</span>
          <button type='button' className={cs.exit} onClick={() => closeModal(handleCloseModal)}>
            <Exit />
          </button>
        </div>
        <form id='createQuestion' className={cs.main}>
          <span className={cs.subTitle}>Question</span>
          <textarea className={cs.textArea} placeholder='질문을 작성하세요 :)' />
          <span className={cs.subTitle}>Answer</span>
          <textarea className={cx(cs.textArea, cs.answerTextArea)} placeholder='답변을 작성하세요 :)' />
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
