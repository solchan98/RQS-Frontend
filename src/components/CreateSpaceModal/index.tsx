import { ChangeEventHandler, useState } from 'react';

import { Exit } from '../../assets/svgs';
import { ModalTemplate } from '../ModalTemplate';

import cx from 'classnames';
import cs from './createSpaceModal.module.scss';

interface Props {
  useModal: { isOpen: boolean; openModal: () => void; closeModal: () => void };
}

export const CreateSpaceModal = ({ useModal }: Props) => {
  const { isOpen, closeModal } = useModal;
  const [visibility, setVisibility] = useState('public');

  const onClickVisibility: ChangeEventHandler<HTMLInputElement> = (e) => setVisibility(e.currentTarget.value);

  return (
    <ModalTemplate isOpen={isOpen} closeModal={closeModal} portalClassName='createSpace'>
      <div className={cs.container}>
        <div className={cs.top}>
          <span className={cs.title}>새로운 스페이스 생성</span>
          <button type='button' className={cs.exit} onClick={closeModal}>
            <Exit />
          </button>
        </div>
        <form id='createSpace' className={cs.main}>
          <span className={cs.subTitle}>Space Name</span>
          <input className={cs.input} placeholder='스페이스의 제목을 입력하세요. :)' />
        </form>
        <div className={cs.bottom}>
          <div className={cs.visibility}>
            <label className={cx(cs.label, visibility === 'public' && cs.selected)} htmlFor='public'>
              공개
            </label>
            <input
              type='radio'
              value='public'
              id='public'
              checked={visibility === 'public'}
              onChange={onClickVisibility}
            />
            <label className={cx(cs.label, visibility === 'private' && cs.selected)} htmlFor='private'>
              비공개
            </label>
            <input
              type='radio'
              value='private'
              id='private'
              checked={visibility === 'private'}
              onChange={onClickVisibility}
            />
          </div>
          <button className={cs.createSpaceBtn} type='submit' form='createSpace'>
            생성하기
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
};
