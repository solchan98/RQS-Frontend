import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

import { login } from 'service/member';
import { IMemberResponse } from 'types/member';
import { memberState } from 'recoil/atoms/member';

import { Oauth } from '../Oauth';
import cs from './login.module.scss';
import { useLoginSuccess } from '../../hooks/useLoginSuccess';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const setMemberValue = useSetRecoilState(memberState);
  const loginSuccess = useLoginSuccess(setMemberValue);

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => setEmail(e.currentTarget.value);
  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => setPassword(e.currentTarget.value);

  const onLoginSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setErr('');
    login(email, password)
      .then((data: IMemberResponse) => loginSuccess(data))
      .catch((error) => setErr(error.response.data?.message ?? 'Server Error'));
  };

  return (
    <form className={cs.loginForm} onSubmit={onLoginSubmit}>
      <div className={cs.top}>
        <strong>Log in</strong>
        <div className={cs.subTop}>
          <span>New to QuizBox?</span>
          <Link to='/auth/sign-up'>Create an account</Link>
        </div>
      </div>
      <Oauth />
      <div className={cs.divideLine} />
      <div className={cs.inputSection}>
        <input type='text' value={email} placeholder='Email' onChange={onChangeEmail} />
        <input type='password' value={password} placeholder='Password' onChange={onChangePassword} />
      </div>
      <div className={cs.loginAlert}>{err !== '' && <span>{err}</span>}</div>
      <button className={cs.loginBtn} type='submit'>
        Log in
      </button>
    </form>
  );
};
