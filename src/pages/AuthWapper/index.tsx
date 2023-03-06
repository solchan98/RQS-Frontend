import { Link, Outlet } from 'react-router-dom';

import cs from './authWrapper.module.scss';
import { LoginLottie } from 'components/Lotties/LoginLottie';

const AuthWrapper = () => {
  return (
    <div className={cs.authWrapper}>
      <div className={cs.authHeader}>
        <Link className={cs.title} to='/'>
          QuizBox
        </Link>
      </div>
      <div className={cs.lottie}>
        <LoginLottie />
      </div>
      <main className={cs.main}>
        <Outlet />
      </main>
      <footer className={cs.footer}>Copyright 2022. RQS all rights reserved.</footer>
    </div>
  );
};

export default AuthWrapper;
