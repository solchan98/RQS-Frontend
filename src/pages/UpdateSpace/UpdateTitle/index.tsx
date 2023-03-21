import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from 'react';

import { ISpace } from 'types/space';
import { updateSpaceTitle } from 'service/spaces';
import { useFetchError } from 'hooks/useFetchError';

import cx from 'classnames';
import cs from './updateTitle.module.scss';

interface Props {
  space: ISpace;
}

export const UpdateTitle = ({ space }: Props) => {
  const [isTitleUpdate, setIsTitleUpdate] = useState(false);
  const onChangeIsTitleUpdate: MouseEventHandler<HTMLButtonElement> = () => setIsTitleUpdate((prev) => !prev);

  const [title, setTitle] = useState(space.title);
  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => setTitle(e.currentTarget.value);

  const onFetchError = useFetchError();
  const onSubmitTitleUpdate: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    updateSpaceTitle(Number(space.spaceId), title)
      .then(() => setIsTitleUpdate(false))
      .catch(onFetchError);
  };

  if (isTitleUpdate)
    return (
      <form className={cs.container} id='updateTitle' onSubmit={onSubmitTitleUpdate}>
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <input autoFocus className={cs.title} value={title} onChange={onChangeTitle} />
        <div className={cs.buttonWrapper}>
          <button className={cs.btn} type='button' onClick={onChangeIsTitleUpdate}>
            취소
          </button>
          <button className={cs.btn} type='submit' form='updateTitle'>
            저장
          </button>
        </div>
      </form>
    );

  return (
    <div className={cs.container}>
      <input readOnly className={cx(cs.title, cs.readOnlyTitle)} value={title} onChange={onChangeTitle} />
      <button className={cs.btn} type='button' onClick={onChangeIsTitleUpdate}>
        변경
      </button>
    </div>
  );
};
