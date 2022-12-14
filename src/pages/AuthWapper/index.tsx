import { Outlet } from 'react-router-dom';

import cs from './authWrapper.module.scss';
import { LoginLottie } from 'components/Lotties/LoginLottie';

const AuthWrapper = () => {
  return (
    <div className={cs.authWrapper}>
      <LoginLottie />
      <div className={cs.authHeader}>
        <span>질문 리스트를 만들어 랜덤 질문을 만나보세요!</span>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthWrapper;
