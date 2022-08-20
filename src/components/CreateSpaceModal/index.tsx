import { useSetRecoilState } from 'recoil';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

import { useLogout } from 'hooks/useLogout';
import { ModalTemplate } from '../ModalTemplate';
import { ISpace } from 'types/space';
import { createSpace } from 'service/spaces';
import { spaceListState } from 'recoil/atoms/spaces';

import cx from 'classnames';
import { Exit } from 'assets/svgs';
import cs from './createSpaceModal.module.scss';

interface Props {
  useModal: { isOpen: boolean; openModal: () => void; closeModal: (handler: Function) => void };
}

export const CreateSpaceModal = ({ useModal }: Props) => {
  const setSpaceList = useSetRecoilState(spaceListState);

  const [title, setTitle] = useState('');
  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    setTitle(value);
    if (value.length !== 0) {
      setErrFlag(false);
    }
  };

  const [visibility, setVisibility] = useState(true);
  const onClickVisibility: ChangeEventHandler<HTMLInputElement> = () => setVisibility((prev) => !prev);

  const [errFlag, setErrFlag] = useState(false);

  const { isOpen, closeModal } = useModal;
  const closeModalHandler = () => {
    setTitle('');
    setErrFlag(false);
    setVisibility(true);
  };

  const createSpaceSuccessHandler = (data: ISpace) => {
    setSpaceList((prev) => ({
      ...prev,
      spaceList: [data, ...prev.spaceList],
    }));
  };

  const logout = useLogout();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (title.length === 0) {
      setErrFlag(true);
      return;
    }
    createSpace(title, visibility)
      .then((data) => {
        createSpaceSuccessHandler(data);
      })
      .catch((err) => {
        console.log(err);
        logout();
      });
    closeModal(closeModalHandler);
  };

  return (
    <ModalTemplate isOpen={isOpen} closeModal={() => closeModal(closeModalHandler)} portalClassName='createSpace'>
      <div className={cs.container}>
        <div className={cs.top}>
          <span className={cs.title}>새로운 스페이스 생성</span>
          <button type='button' className={cs.exit} onClick={() => closeModal(closeModalHandler)}>
            <Exit />
          </button>
        </div>
        <form id='createSpace' className={cs.main} onSubmit={onSubmit}>
          <span className={cs.subTitle}>Space Name</span>
          <input
            className={cs.input}
            value={title}
            onChange={onChangeTitle}
            placeholder='스페이스의 제목을 입력하세요. :)'
          />
          {errFlag && <span className={cs.errFlag}>내용이 비어있습니다!</span>}
        </form>
        <div className={cs.bottom}>
          <div className={cs.visibility}>
            <label className={cx(cs.label, visibility && cs.selected)} htmlFor='public'>
              공개
            </label>
            <input type='radio' id='public' checked={visibility} onChange={onClickVisibility} />
            <label className={cx(cs.label, !visibility && cs.selected)} htmlFor='private'>
              비공개
            </label>
            <input type='radio' id='private' checked={!visibility} onChange={onClickVisibility} />
          </div>
          <button className={cs.createSpaceBtn} type='submit' form='createSpace'>
            생성하기
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
};
