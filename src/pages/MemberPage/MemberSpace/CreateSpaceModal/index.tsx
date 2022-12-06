import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';

import { useLogout } from 'hooks/useLogout';
import { createSpace } from 'service/spaces';
import { ModalTemplate } from 'components/ModalTemplate';

import { Exit } from 'assets/svgs';
import cx from 'classnames';
import cs from './createSpaceModal.module.scss';

interface Props {
  useModal: { isOpen: boolean; openModal: () => void; closeModal: (handler: Function) => void };
  refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => void;
}

export const CreateSpaceModal = ({ useModal, refetch }: Props) => {
  const [title, setTitle] = useState('');
  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    setTitle(value);
    if (value.length !== 0 && errFlag) setErrFlag((prev) => !prev);
  };

  const [content, setContent] = useState('');

  const onChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => setContent(e.currentTarget.value);

  const [visibility, setVisibility] = useState(true);
  const onClickVisibility: ChangeEventHandler<HTMLInputElement> = () => setVisibility((prev) => !prev);

  const [errFlag, setErrFlag] = useState(false);

  const { isOpen, closeModal } = useModal;
  const closeModalHandler = () => {
    setTitle('');
    setErrFlag(false);
    setVisibility(true);
  };

  const logout = useLogout();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (title.length === 0) {
      setErrFlag(true);
    } else {
      createSpace(title, content, visibility)
        .then(() => refetch())
        .catch((err) => (err.response?.status === 401 ? logout() : alert(err.response?.data.message)));
      closeModal(closeModalHandler);
    }
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
          <span className={cs.subTitle}>Space Content</span>
          <textarea
            className={cs.input}
            value={content}
            onChange={onChangeContent}
            placeholder='스페이스를 간단하게 설명해주세요. :)'
          />
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
