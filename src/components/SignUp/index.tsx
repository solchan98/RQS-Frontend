import { ChangeEventHandler, FormEventHandler, useState } from 'react';

import { checkEmail, signUp } from 'service/member';

import cx from 'classnames';
import cs from './signUp.module.scss';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Box } from '@mui/material';
import Email from './Email';
import Nickname from './Nickname';
import Password from './Password';

const EMAIL_REG_EXP = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const PASSWORD_REG_EXP = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@!%*#?&])[A-Za-z\d$@!%*#?&]{8,}$/;

export const SignUp = () => {
  // const [email, setEmail] = useState('');
  // const [invalidEmail, setInvalidEmail] = useState(false);
  // const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   if (checkDuplicateEmail) setCheckDuplicateEmail((prev) => !prev);
  //   setInvalidEmail(!EMAIL_REG_EXP.test(e.currentTarget.value));
  //   setEmail(e.currentTarget.value);
  // };
  // const [checkDuplicateEmail, setCheckDuplicateEmail] = useState(false);
  // const onCheckDuplicateEmail = () => {
  //   if (email !== '' && !invalidEmail) {
  //     checkEmail(email).then((data) => {
  //       setCheckDuplicateEmail(!data.exist);
  //       if (data.exist) alert('이미 존재하는 이메일입니다.');
  //     });
  //   }
  // };
  //
  // const [nickname, setNickname] = useState('');
  // const [invalidNickname, setInvalidNickname] = useState(false);
  // const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   setInvalidNickname(e.currentTarget.value === '');
  //   setNickname(e.currentTarget.value);
  // };
  //
  // const [password, setPassword] = useState('');
  // const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   setInvalidPassword(!PASSWORD_REG_EXP.test(e.currentTarget.value));
  //   setPassword(e.currentTarget.value);
  // };
  // const [invalidPassword, setInvalidPassword] = useState(false);
  //
  // const nav = useNavigate();
  // const onSubmitSuccessHandler = () => {
  //   alert('회원가입에 성공하였습니다.');
  //   nav('/auth/login');
  // };
  //
  // const onSubmitFailHandler = (err: AxiosError<{ message: string }>) => {
  //   alert(err.response?.data.message ?? 'SERVER ERROR');
  // };
  //
  // const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
  //   e.preventDefault();
  //   signUp(email, nickname, password)
  //     .then(() => onSubmitSuccessHandler())
  //     .catch((err) => onSubmitFailHandler(err));
  // };

  /// /////

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');

  const [curIdx, setCurIdx] = useState(0);

  const nextStep = () => {
    if (curIdx + 1 === 3) setCurIdx(0);
    else setCurIdx((prev) => prev + 1);
  };

  return (
    <form className={cs.container}>
      <Box style={{ position: 'relative' }}>
        <Email email={email} setEmail={setEmail} checked={curIdx === 0} nextStep={nextStep} />
        <Nickname nickname={nickname} setNickname={setNickname} checked={curIdx === 1} nextStep={nextStep} />
        <Password checked={curIdx === 2} nextStep={nextStep} />
      </Box>
      {/* <input className={cs.input} type='email' value={email} placeholder='아이디' onChange={onChangeEmail} /> */}
      {/* <button */}
      {/*  className={cs.checkEmailBtn} */}
      {/*  disabled={email === '' || invalidEmail || checkDuplicateEmail} */}
      {/*  type='button' */}
      {/*  onClick={onCheckDuplicateEmail} */}
      {/* > */}
      {/*  {checkDuplicateEmail ? '확인 완료 ✅' : '중복체크 ☑️'} */}
      {/* </button> */}
      {/* <span className={cx(cs.inputInfo, invalidEmail && cs.alert)}>이메일 형식으로 작성해주세요</span> */}
      {/* <input className={cs.input} type='text' value={nickname} placeholder='닉네임' onChange={onChangeNickname} /> */}
      {/* <span className={cx(cs.inputInfo, invalidNickname && cs.alert)}>닉네임은 비어있으면 안됩니다.</span> */}
      {/* <input className={cs.input} type='password' value={password} placeholder='비밀번호' onChange={onChangePassword} /> */}
      {/* <span className={cx(cs.inputInfo, invalidPassword && cs.alert)}> */}
      {/*  영문과 특수문자 숫자를 포함하며 8자 이상이어야 합니다. */}
      {/* </span> */}
      {/* <button */}
      {/*  className={cs.signUpBtn} */}
      {/*  disabled={invalidEmail || invalidPassword || !checkDuplicateEmail || nickname === ''} */}
      {/*  type='submit' */}
      {/* > */}
      {/*  회원가입 */}
      {/* </button> */}
    </form>
  );
};
