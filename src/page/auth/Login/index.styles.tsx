import styled from 'styled-components';
import { Button, TextField } from '@mui/material';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
`;

export const LoginTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 40%;

  font-size: 48px;
  font-weight: bold;
`;

export const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const LoginInputForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 18px 12px;
`;

export const LoginInput = styled(TextField)``;

export const LoginButton = styled(Button)`
  padding-top: 48px !important;
`;
