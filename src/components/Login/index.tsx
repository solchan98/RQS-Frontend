import { useSetRecoilState } from 'recoil';
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from 'react';

import { login } from 'service/member';
import { memberState } from 'recoil/atoms/member';
import { IMemberResponse } from 'types/member';

import cs from './login.module.scss';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const setMemberValue = useSetRecoilState(memberState);

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => setEmail(e.currentTarget.value);
  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => setPassword(e.currentTarget.value);

  const onLoginSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setErr('');
    login(email, password)
      .then((data: IMemberResponse) => {
        const { memberId, nickname, avatar } = data;
        setMemberValue((prev) => ({
          ...prev,
          memberId,
          email,
          nickname,
          avatar: avatar ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
          isLoggedIn: true,
        }));
      })
      .catch((error) => setErr(error.response.data?.message ?? 'Server Error'));
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
