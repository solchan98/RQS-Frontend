import { useSetRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

import { login } from 'service/member';
import { memberState } from 'recoil/atoms/member';
import { IMemberResponse, IMemberSubject } from 'types/member';

import { GoogleLogin, KakaoLogin } from 'assets/svgs';
import cs from './login.module.scss';
import cx from 'classnames';
import jwtDecode from 'jwt-decode';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const setMemberValue = useSetRecoilState(memberState);

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => setEmail(e.currentTarget.value);
  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => setPassword(e.currentTarget.value);

  const nav = useNavigate();
  const onLoginSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setErr('');
    login(email, password)
      .then((data: IMemberResponse) => {
        const { atk } = data;
        const decoded: { exp: number; iat: number; sub: string } = jwtDecode(atk);
        const { memberId, nickname, avatar }: IMemberSubject = JSON.parse(decoded.sub);
        setMemberValue((prev) => ({
          ...prev,
          memberId,
          email,
          nickname,
          avatar: avatar ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
          isLoggedIn: true,
        }));
        nav('/');
      })
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
      <div className={cs.oauth}>
        <button type='button' className={cx(cs.oauthBtn, cs.google)}>
          <GoogleLogin width='32px' height='32px' />
          Google
        </button>
        <button type='button' className={cx(cs.oauthBtn, cs.kakao)}>
          <KakaoLogin width='32px' height='32px' />
          Kakao
        </button>
      </div>
      <span className={cs.divideLine} />
      <div className={cs.inputSection}>
        <input type='text' value={email} placeholder='Email' onChange={onChangeEmail} />
        <input type='password' value={password} placeholder='Password' onChange={onChangePassword} />
      </div>
      {err !== '' && <span>{err}</span>}
      <button className={cs.loginBtn} type='submit'>
        Log in
      </button>
    </form>
  );
};
