import { ModalTemplate } from '../ModalTemplate';

import cs from './randomQModal.module.scss';
import { TitleQuestion } from 'assets/svgs';
import { useMount } from 'react-use';

const TEMP_Q =
  ' HTTP와 HTTPS의 차이점에 대하여 설명해주세요 HTTP와 HTTPS의 차이점에 대하여 설명해주세요 HTTP와 HTTPS의 차이점에 대하여 설명해주세요';

interface Props {
  useModal: { isOpen: boolean; openModal: () => void; closeModal: (handler: Function) => void };
}

export const RandomQModal = ({ useModal }: Props) => {
  const { isOpen, closeModal } = useModal;
  const closeModalHandler = () => {};

  return (
    <ModalTemplate isOpen={isOpen} closeModal={() => closeModal(closeModalHandler)} portalClassName='randomQuestion'>
      <div className={cs.container}>
        <div className={cs.questionWrapper}>
          <div className={cs.question}>
            <TitleQuestion />
            <span>{TEMP_Q}</span>
          </div>
        </div>
        <div className={cs.bottom}>
          <ul className={cs.hintList}>
            <li className={cs.hint}>보안</li>
            <li className={cs.hint}>SSL</li>
          </ul>
          <div className={cs.buttonWrapper}>
            <button className={cs.nextButton} type='button'>
              다음 문제
            </button>
          </div>
        </div>
      </div>
    </ModalTemplate>
  );
};
