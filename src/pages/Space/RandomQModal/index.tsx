import { useMemo, useState } from 'react';

import { getRandomSpaceItem } from 'service/items';
import { useLogout } from 'hooks/useLogout';
import { IRandomItem } from 'types/item';
import { ISpace } from 'types/space';

import ToastViewer from 'components/ToastUI/Viewer';
import { ModalTemplate } from 'components/ModalTemplate';
import { StartLottie } from 'components/Lotties/StartLottie';

import { TitleQuestion } from 'assets/svgs';
import cx from 'classnames';
import cs from './randomQModal.module.scss';
import { Timer } from '../../../components/Timer';

interface Props {
  useModal: { isOpen: boolean; openModal: () => void; closeModal: (handler: Function) => void };
  space: ISpace;
}

export const RandomQModal = ({ useModal, space }: Props) => {
  const [startState, setStartState] = useState(false);
  const [showState, setShowState] = useState(true);
  const [quiz, setQuiz] = useState<IRandomItem>({} as IRandomItem);

  const { isOpen, closeModal } = useModal;
  const closeModalHandler = () => setStartState(false);

  const logout = useLogout();
  const getRandomQuiz = () => {
    getRandomSpaceItem(Number(space.spaceId))
      .then((data) => {
        setQuiz(data);
        if (!startState) setStartState((prev) => !prev);
        if (!showState) setShowState((prev) => !prev);
      })
      .catch((err) => (err.response?.status === 401 ? logout() : alert(err.response?.data.message)));
  };

  const date = useMemo(() => Date.now() + quiz.remainingExpireTime, [quiz]);

  if (!startState)
    return (
      <ModalTemplate isOpen={isOpen} closeModal={() => closeModal(closeModalHandler)} portalClassName='randomQuestion'>
        <div className={cx(cs.container, cs.beforeStart)}>
          <p className={cs.title}>{space.title}</p>
          <ul className={cs.noticeList}>
            <li>
              스페이스에 존재하는 모든 문제가 <mark>중복없이 랜덤으로 출제</mark>됩니다.
            </li>
            <li>
              오른쪽 상단에는 <mark>중복 없이</mark> 문제를 뽑을 수 있는 <mark>시간</mark>이 존재합니다.
            </li>
            <li>
              시간은 <mark>문제를 뽑을 때 마다 초기화</mark> 됩니다.
            </li>
            <li>실수로 창을 닫아도 해당 시간 내에는 유지됩니다.</li>
          </ul>
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
        <div className={cs.statusWrapper}>
          <div className={cs.remainingWord}>
            <p>남은 문제</p>
            <p>{quiz.remainingWordCnt}개</p>
          </div>
          <div className={cs.remainingExpiredTime}>
            남은 시간 <Timer date={date} />
          </div>
        </div>
        {showState && (
          <div className={cs.questionWrapper}>
            <div className={cs.question}>
              <TitleQuestion />
              <span>{quiz.itemResponse.question}</span>
            </div>
          </div>
        )}
        {!showState && (
          <div className={cs.answer}>
            <ToastViewer content={quiz.itemResponse.answer} />
          </div>
        )}
        <div className={cs.bottom}>
          <ul className={cs.hintList}>
            {quiz.itemResponse.hint.length !== 0 &&
              quiz.itemResponse.hint.split(',').map((hint) => (
                <li key={hint} className={cs.hint}>
                  {hint}
                </li>
              ))}
          </ul>
          <div className={cs.buttonWrapper}>
            <button className={cs.nextButton} type='button' onClick={() => setShowState((prev) => !prev)}>
              {showState ? '정답 보기' : '문제 보기'}
            </button>
            <button className={cs.nextButton} type='button' onClick={getRandomQuiz}>
              다음 문제
            </button>
          </div>
        </div>
      </div>
    </ModalTemplate>
  );
};
