import { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

import { checkEmail, signUp } from 'service/member';

import { Oauth } from '../Oauth';
import cs from './signUp.module.scss';
import loginCs from '../Login/login.module.scss';
import cx from 'classnames';

const EMAIL_REG_EXP = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const PASSWORD_REG_EXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{8,20}$/;

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValidEmail(EMAIL_REG_EXP.test(e.currentTarget.value));
    setEmail(e.currentTarget.value);
  };

  const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => setNickname(e.currentTarget.value);

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValidPassword(PASSWORD_REG_EXP.test(e.currentTarget.value));
    setPassword(e.currentTarget.value);
  };

  const nav = useNavigate();
  const onSubmitSuccessHandler = () => {
    alert('회원가입에 성공하였습니다.');
    nav('/auth/login');
  };

  const onSubmitFailHandler = (err: AxiosError<{ message: string }>) => {
    alert(err.response?.data.message ?? 'SERVER ERROR');
  };

  const onCheckDupEmailSuccess = () => {
    signUp(email, nickname, password).then(onSubmitSuccessHandler).catch(onSubmitFailHandler);
  };

  const onSubmitSignUp: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    checkEmail(email).then((data) => (!data.exist ? onCheckDupEmailSuccess() : alert('중복된 이메일입니다!')));
  };

  return (
    <form id='signUp' className={loginCs.loginForm} onSubmit={onSubmitSignUp}>
      <div className={loginCs.top}>
        <strong>Create an account</strong>
        <div className={loginCs.subTop}>
          <span>Already have an account?</span>
          <Link to='/auth/login'>Login</Link>
        </div>
      </div>
      <Oauth />
      <div className={loginCs.divideLine} />
      <div className={loginCs.inputSection}>
        <div className={cs.commonInput}>
          <input type='text' value={email} placeholder='Email' onChange={onChangeEmail} />
          <div className={cs.alert}>{!validEmail && <p>이메일 형식으로 작성해주세요</p>}</div>
        </div>
        <div className={cs.commonInput} style={{ marginBottom: '4px' }}>
          <input type='text' value={nickname} placeholder='Nickname' onChange={onChangeNickname} />
        </div>
        <div className={cs.commonInput}>
          <input type='password' value={password} placeholder='Password' onChange={onChangePassword} />
          <div className={cs.alert}>{!validPassword && <p>영문과 숫자를 포함하여 8자 이상이어야 합니다.</p>}</div>
        </div>
      </div>
      <button
        type='submit'
        className={cx(loginCs.loginBtn, cs.signUpBtn)}
        disabled={!validEmail || !validPassword}
        form='signUp'
      >
        Sign up
      </button>
    </form>
  );
};
