import store from 'store';

import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from 'service/user';
import { useSetRecoilState } from 'recoil';
import { userState } from 'recoil/atoms/user';

import cs from './login.module.scss';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const setUser = useSetRecoilState(userState);

  const nav = useNavigate();

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => setEmail(e.currentTarget.value);
  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => setPassword(e.currentTarget.value);

  const onLoginSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setErr('');
    login(email, password)
      .then((res) => {
        const { userId, nickname, avatar, atk } = res.data;
        setUser((prev) => ({
          ...prev,
          userId,
          nickname,
          avatar,
          isLoggedIn: true,
        }));
        store.set('atk', atk);
      })
      .catch((error) => console.log(error));
  };

  const onClickSignUp: MouseEventHandler<HTMLButtonElement> = () => {
    console.log('회원가입 페이지로 이동!');
    // nav('/auth/sign-up')
  };

  return (
    <form className={cs.loginForm} onSubmit={onLoginSubmit}>
      <input type='text' value={email} placeholder='아이디' onChange={onChangeEmail} />
      <input type='password' value={password} placeholder='비밀번호' onChange={onChangePassword} />
      {err !== '' && <span>{err}</span>}
      <button className={cs.loginBtn} type='submit'>
        로그인
      </button>
      <button type='button' className={cs.signUpSpan} onClick={onClickSignUp}>
        아직 회원이 아니신가요?
      </button>
    </form>
  );
};
