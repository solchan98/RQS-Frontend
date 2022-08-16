import cs from './login.module.scss';

export const Login = () => {
  return (
    <form className={cs.loginForm} onSubmit={() => {}}>
      <input type='text' placeholder='아이디' onChange={() => {}} />
      <input type='password' placeholder='비밀번호' onChange={() => {}} />
      {/* {errorMessage !== '' && <span>{errorMessage}</span>} */}
      <button className={cs.loginBtn} type='submit'>
        로그인
      </button>
      <button type='button' className={cs.signUpSpan} onClick={() => {}}>
        아직 회원이 아니신가요?
      </button>
    </form>
  );
};
