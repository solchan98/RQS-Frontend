import React, { FormEvent, useEffect } from 'react';
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
import { Alert } from '@mui/material';
import { useErrorRequest } from '../../../hooks/useErrorRequest';

export const Login = () => {
  const { value: email, onChange: onChangeEmail } = useInput();
  const { value: password, onChange: onChangePassword } = useInput();
  const { errorsState, setErrorState } = useErrorRequest();

  const { login } = useLogin({ setErrorState });

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login({ email, password });
  };

  return (
    <LoginContainer>
      {Object.keys(errorsState).map(
        (key) =>
          errorsState[key] && (
            <Alert key={key} severity='error'>
              {errorsState[key].message}
            </Alert>
          ),
      )}
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
