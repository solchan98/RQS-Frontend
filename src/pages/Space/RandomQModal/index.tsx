import { useState } from 'react';
import { getRandomSpaceItem } from 'service/items';

import { useLogout } from 'hooks/useLogout';
import { IItem } from 'types/item';
import { ISpace } from 'types/space';

import { ModalTemplate } from 'components/ModalTemplate';
import { StartLottie } from 'components/Lotties/StartLottie';
import { TitleQuestion } from 'assets/svgs';
import cx from 'classnames';
import cs from './randomQModal.module.scss';

interface Props {
  useModal: { isOpen: boolean; openModal: () => void; closeModal: (handler: Function) => void };
  space: ISpace;
}

export const RandomQModal = ({ useModal, space }: Props) => {
  const [startState, setStartState] = useState(false);
  const [quiz, setQuiz] = useState<IItem>({} as IItem);

  const { isOpen, closeModal } = useModal;
  const closeModalHandler = () => setStartState(false);

  const logout = useLogout();

  const getRandomQuiz = () => {
    getRandomSpaceItem(Number(space.spaceId))
      .then((data) => {
        setQuiz(data);
        if (!startState) setStartState((prev) => !prev);
      })
      .catch((err) => (err.response?.status === 401 ? logout : alert(err.response?.data.message)));
  };

  if (!startState)
    return (
      <ModalTemplate isOpen={isOpen} closeModal={() => closeModal(closeModalHandler)} portalClassName='randomQuestion'>
        <div className={cx(cs.container, cs.beforeStart)}>
          <div>{space.title}</div>
          <small className={cs.tip}>(질문이 적은 경우 중복 확률이 높습니다.)</small>
          <StartLottie />
          <button className={cs.startButton} type='button' onClick={getRandomQuiz}>
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
            <span>{quiz.question}</span>
          </div>
        </div>
        <div className={cs.bottom}>
          <ul className={cs.hintList}>
            {quiz.hint.length !== 0 &&
              quiz.hint.split(',').map((hint) => (
                <li key={hint} className={cs.hint}>
                  {hint}
                </li>
              ))}
          </ul>
          <div className={cs.buttonWrapper}>
            <button className={cs.nextButton} type='button' onClick={getRandomQuiz}>
              다음 문제
            </button>
          </div>
        </div>
      </div>
    </ModalTemplate>
  );
};
