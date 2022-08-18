import cx from 'classnames';

import { Exit } from '../../assets/svgs';

import cs from './createQModal.module.scss';
import { ModalTemplate } from '../ModalTemplate';

interface Props {
  useModal: { isOpen: boolean; openModal: () => void; closeModal: () => void };
}

export const CreateQModal = ({ useModal }: Props) => {
  const { isOpen, closeModal } = useModal;

  return (
    <ModalTemplate isOpen={isOpen} closeModal={closeModal} portalClassName='createQuestion'>
      <div className={cs.container}>
        <div className={cs.top}>
          <span className={cs.spaceTitle}>백엔드 면접 예상 질문 모음</span>
          <button type='button' className={cs.exit} onClick={closeModal}>
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
          <input className={cs.hintInput} placeholder='ex) 보안' />
          <ul className={cs.hintList}>
            <li>
              <button type='button' className={cs.hint}>
                HTTP
              </button>
            </li>
            <li>
              <button type='button' className={cs.hint}>
                보안
              </button>
            </li>
            <li>
              <button type='button' className={cs.hint}>
                HTTP
              </button>
            </li>
            <li>
              <button type='button' className={cs.hint}>
                보안
              </button>
            </li>
            <li>
              <button type='button' className={cs.hint}>
                HTTP
              </button>
            </li>
            <li>
              <button type='button' className={cs.hint}>
                보안
              </button>
            </li>
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
