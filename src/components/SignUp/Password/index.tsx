import { Zoom } from '@mui/material';
import { ChangeEventHandler, Dispatch, SetStateAction, useState } from 'react';

import cx from 'classnames';
import cms from '../common.module.scss';

interface Props {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  checked: boolean;
}

const PASSWORD_REG_EXP = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@!%*#?&])[A-Za-z\d$@!%*#?&]{8,}$/;

const Password = ({ password, setPassword, checked }: Props) => {
  const [invalidPassword, setInvalidPassword] = useState(true);
  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInvalidPassword(!PASSWORD_REG_EXP.test(e.currentTarget.value));
    setPassword(e.currentTarget.value);
  };

  return (
    <Zoom style={{ display: checked ? 'block' : 'none' }} in={checked}>
      <div className={cms.container}>
        <div className={cms.inputContainer}>
          <p className={cms.label}>Password</p>
          <input
            type='password'
            className={cms.input}
            value={password}
            placeholder='비밀번호를 입력해주세요.'
            onChange={onChangePassword}
          />
          {invalidPassword && <p className={cms.alert}>영문과 특수문자 숫자를 포함하며 8자 이상이어야 합니다.</p>}
          <div className={cms.btnWrapper}>
            <button
              type='submit'
              className={cx(cms.signUpBtn, invalidPassword && cms.invalid)}
              disabled={invalidPassword}
              form='signUp'
            >
              회원 가입
            </button>
          </div>
        </div>
      </div>
    </Zoom>
  );
};

export default Password;
