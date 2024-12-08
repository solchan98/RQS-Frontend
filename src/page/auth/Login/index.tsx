import { FormEvent } from 'react';
import { useLogin } from './useLogin';
import { useInput } from '../../../hooks/useInput';

export const Login = () => {
  const { value: email, onChange: onChangeEmail } = useInput();
  const { value: password, onChange: onChangePassword } = useInput();

  const { login } = useLogin();

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login({ email, password });
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={onSubmitForm}>
        <input type='email' value={email} placeholder='email' onChange={onChangeEmail} />
        <input type='password' value={password} placeholder='Password' onChange={onChangePassword} />
        <button type='submit'>Login</button>
      </form>
    </>
  );
};
