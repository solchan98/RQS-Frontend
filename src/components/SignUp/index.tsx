import { AxiosError } from 'axios';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormEventHandler, useState } from 'react';

import { signUp } from 'service/member';
import Email from './Email';
import Nickname from './Nickname';
import Password from './Password';

import cs from './signUp.module.scss';

const PROCESS_CNT = 3;

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const [curIdx, setCurIdx] = useState(0);
  const nextStep = () => {
    if (curIdx + 1 === PROCESS_CNT) setCurIdx(0);
    else setCurIdx((prev) => prev + 1);
  };

  const nav = useNavigate();
  const onSubmitSuccessHandler = () => {
    alert('회원가입에 성공하였습니다.');
    nav('/auth/login');
  };

  const onSubmitFailHandler = (err: AxiosError<{ message: string }>) => {
    alert(err.response?.data.message ?? 'SERVER ERROR');
  };

  const onSubmitSignUp: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    signUp(email, nickname, password).then(onSubmitSuccessHandler).catch(onSubmitFailHandler);
  };

  return (
    <form id='signUp' className={cs.container} onSubmit={onSubmitSignUp}>
      <Box>
        <Email email={email} setEmail={setEmail} checked={curIdx === 0} nextStep={nextStep} />
        <Nickname nickname={nickname} setNickname={setNickname} checked={curIdx === 1} nextStep={nextStep} />
        <Password password={password} setPassword={setPassword} checked={curIdx === 2} />
      </Box>
    </form>
  );
};
