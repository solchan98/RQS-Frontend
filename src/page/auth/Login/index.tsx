import React, { FormEvent } from 'react';
import { useLogin } from './useLogin';
import { useInput } from '../../../hooks/useInput';
import {
  LoginButton,
  LoginContainer,
  LoginInput,
  LoginInputContainer,
  LoginInputForm,
  LoginTitleContainer,
} from './index.styles';
import { IoIosLogIn } from 'react-icons/io';
import { useCommonAlert } from '../../../hooks/useCommonAlert';
import { Alert } from '@mui/material';

export const Login = () => {
  const { value: email, onChange: onChangeEmail } = useInput();
  const { value: password, onChange: onChangePassword } = useInput();

  const { alertState, onAlert } = useCommonAlert();
  const { login } = useLogin({ onAlert });

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login({ email, password });
  };

  return (
    <LoginContainer>
      {alertState.active && <Alert severity='error'>{alertState.message}</Alert>}
      <LoginTitleContainer>Quiz Box</LoginTitleContainer>
      <LoginInputContainer>
        <LoginInputForm onSubmit={onSubmitForm}>
          <LoginInput label='Email' type='email' required variant='outlined' value={email} onChange={onChangeEmail} />
          <LoginInput
            label='Password'
            required
            type='password'
            variant='outlined'
            value={password}
            onChange={onChangePassword}
          />
          <LoginButton type='submit' startIcon={<IoIosLogIn />}>
            Login
          </LoginButton>
        </LoginInputForm>
      </LoginInputContainer>
    </LoginContainer>
  );
};
