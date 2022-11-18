import { Zoom } from '@mui/material';
import { ChangeEventHandler, Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';

import { checkEmail } from 'service/member';

import cx from 'classnames';
import cms from '../common.module.scss';

interface Props {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  checked: boolean;
  nextStep: () => void;
}

const EMAIL_REG_EXP = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const Email = ({ email, setEmail, checked, nextStep }: Props) => {
  const [invalidEmail, setInvalidEmail] = useState(true);
  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInvalidEmail(!EMAIL_REG_EXP.test(e.currentTarget.value));
    setEmail(e.currentTarget.value);
  };

  const checkEmailIsValid = () => email !== '' && !invalidEmail;

  const onSubmitHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const isValid = checkEmailIsValid();
    if (!isValid) return;
    checkEmail(email).then((data) => (data.exist ? alert('이미 존재하는 이메일입니다.') : nextStep()));
  };

  return (
    <Zoom style={{ display: checked ? 'block' : 'none' }} in={checked}>
      <div className={cms.container}>
        <div className={cms.inputContainer}>
          <p className={cms.label}>Email</p>
          <input
            type='text'
            className={cms.input}
            value={email}
            placeholder='이메일을 입력해주세요.'
            onChange={onChangeEmail}
          />
          {invalidEmail && <p className={cms.alert}>이메일 형식으로 작성해주세요</p>}
          <div className={cms.btnWrapper}>
            <button
              type='button'
              className={cx(cms.signUpBtn, invalidEmail && cms.invalid)}
              disabled={invalidEmail}
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

export default Email;
