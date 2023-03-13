import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinSpaceWithCode } from 'service/spaces';

import { ModalTemplate } from 'components/ModalTemplate';
import { IJoinSpace } from 'types/space';
import { useLogout } from 'hooks/useLogout';
import { Members, Question } from 'assets/svgs';
import cs from './joinModal.module.scss';

interface Props {
  useModal: { isOpen: boolean; openModal: () => void; closeModal: (handler: Function) => void };
  joinSpace: IJoinSpace;
  joinCode: string;
}

export const JoinModal = ({ useModal, joinSpace, joinCode }: Props) => {
  const { isOpen, closeModal } = useModal;

  const closeModalHandler = () => {};

  const logout = useLogout();
  const onJoinFailureHandler = () => {
    logout();
    alert('로그인이 필요합니다.');
  };

  const nav = useNavigate();
  const join: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    joinSpaceWithCode(joinSpace.spaceId, joinCode)
      .then(() => nav(`/space/${joinSpace.spaceId}`))
      .catch((err) => (err.response.status === 401 ? onJoinFailureHandler() : alert(err.response?.data.message)));
  };

  return (
    <ModalTemplate isOpen={isOpen} closeModal={() => closeModal(closeModalHandler)} portalClassName='joinSpace'>
      <div className={cs.container}>
        <div className={cs.top}>{joinSpace.title}</div>
        <div className={cs.main}>
          <span className={cs.label}>Description</span>
          <p>{joinSpace.content}</p>
          <span className={cs.label}>참여 권한</span>
          <p>{joinSpace.spaceRole === 'ADMIN' ? '관리자' : '멤버'}</p>
        </div>
        <div className={cs.bottom}>
          <div className={cs.spaceStatus}>
            <div className={cs.cntWrapper}>
              <Question />
              <span>{joinSpace.quizCount}</span>
            </div>
            <div className={cs.cntWrapper}>
              <Members />
              <span>{joinSpace.spaceMemberCount}</span>
            </div>
          </div>
          <button className={cs.button} type='button' onClick={join}>
            참여하기
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
};
