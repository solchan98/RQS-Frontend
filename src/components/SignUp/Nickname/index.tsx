import { Zoom } from '@mui/material';

import cms from '../common.module.scss';
import { ChangeEventHandler, Dispatch, SetStateAction, useState } from 'react';
import cx from 'classnames';

interface Props {
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
  checked: boolean;
  nextStep: () => void;
}

const Nickname = ({ nickname, setNickname, checked, nextStep }: Props) => {
  const [invalidNickname, setInvalidNickname] = useState(true);

  const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    const invalid = value === '' || value.length === 0;
    setInvalidNickname(invalid);
    setNickname(value);
  };

  const onSubmitHandler = () => {
    if (invalidNickname) return;
    nextStep();
  };
  return (
    <Zoom style={{ display: checked ? 'block' : 'none' }} in={checked}>
      <div className={cms.container}>
        <p className={cms.label}>Nickname</p>
        <div className={cms.inputContainer}>
          <input
            type='text'
            className={cms.input}
            value={nickname}
            placeholder='닉네임을 입력해주세요.'
            onChange={onChangeNickname}
          />
          {invalidNickname && <p className={cms.alert}>닉네임을 입력해주세요.</p>}
          <div className={cms.btnWrapper}>
            <button
              type='button'
              className={cx(cms.signUpBtn, invalidNickname && cms.invalid)}
              disabled={invalidNickname}
              onClick={onSubmitHandler}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </Zoom>
  );
};

export default Nickname;
