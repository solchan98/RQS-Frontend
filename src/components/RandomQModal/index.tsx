import { useState } from 'react';
import { getRandomSpaceItem } from 'service/items';

import { IItem } from 'types/item';
import { useLogout } from 'hooks/useLogout';
import { TitleQuestion } from 'assets/svgs';
import { ModalTemplate } from '../ModalTemplate';

import cs from './randomQModal.module.scss';
import cx from 'classnames';
import { StartLottie } from '../Lotties/StartLottie';

interface Props {
  useModal: { isOpen: boolean; openModal: () => void; closeModal: (handler: Function) => void };
  spaceInfo: { spaceId: number; spaceTitle: string; myRole: string };
}

export const RandomQModal = ({ useModal, spaceInfo }: Props) => {
  const [startState, setStartState] = useState(false);

  const { isOpen, closeModal } = useModal;
  const closeModalHandler = () => setStartState(false);

  const logout = useLogout();

  const [itemState, setItemState] = useState<IItem>({} as IItem);
  const getItem = () => {
    getRandomSpaceItem(spaceInfo.spaceId)
      .then((data) => {
        setItemState(data);
        setStartState(true);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          logout();
        } else {
          closeModal(closeModalHandler);
          alert(err.response.data?.message ?? 'SERVER ERROR');
        }
      });
  };

  if (!startState)
    return (
      <ModalTemplate isOpen={isOpen} closeModal={() => closeModal(closeModalHandler)} portalClassName='randomQuestion'>
        <div className={cx(cs.container, cs.beforeStart)}>
          <div>{spaceInfo.spaceTitle}</div>
          <small className={cs.tip}>(질문이 적은 경우 중복 확률이 높습니다.)</small>
          <StartLottie />
          <button className={cs.startButton} type='button' onClick={getItem}>
            시작하기
          </button>
        </div>
      </ModalTemplate>
    );

  return (
    <ModalTemplate isOpen={isOpen} closeModal={() => closeModal(closeModalHandler)} portalClassName='randomQuestion'>
      <div className={cs.container}>
        <div className={cs.questionWrapper}>
          <div className={cs.question}>
            <TitleQuestion />
            <span>{itemState.question}</span>
          </div>
        </div>
        <div className={cs.bottom}>
          <ul className={cs.hintList}>
            {itemState.hint.split(',').map((hint) => (
              <li key={hint} className={cs.hint}>
                {hint}
              </li>
            ))}
          </ul>
          <div className={cs.buttonWrapper}>
            <button className={cs.nextButton} type='button' onClick={getItem}>
              다음 문제
            </button>
          </div>
        </div>
      </div>
    </ModalTemplate>
  );
};
