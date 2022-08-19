import { ChangeEventHandler, FormEventHandler, useState } from 'react';

import { Exit } from '../../assets/svgs';
import { ModalTemplate } from '../ModalTemplate';

import cx from 'classnames';
import cs from './createSpaceModal.module.scss';
import { createSpace } from '../../service/spaces';
import { useSetRecoilState } from 'recoil';
import { spaceListState } from '../../recoil/atoms/spaces';
import { ISpace } from 'types/space';

interface Props {
  useModal: { isOpen: boolean; openModal: () => void; closeModal: () => void };
}

export const CreateSpaceModal = ({ useModal }: Props) => {
  const { isOpen, closeModal } = useModal;
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

  const createSpaceSuccessHandler = (data: ISpace) => {
    setSpaceList((prev) => ({
      ...prev,
      spaceList: [data, ...prev.spaceList],
    }));
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (title.length === 0) {
      setErrFlag(true);
      return;
    }
    createSpace(title, visibility)
      .then((data) => {
        createSpaceSuccessHandler(data);
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  return (
    <ModalTemplate isOpen={isOpen} closeModal={closeModal} portalClassName='createSpace'>
      <div className={cs.container}>
        <div className={cs.top}>
          <span className={cs.title}>새로운 스페이스 생성</span>
          <button type='button' className={cs.exit} onClick={closeModal}>
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
