import { Outlet } from 'react-router-dom';

import cs from './authWrapper.module.scss';

const AuthWrapper = () => {
  return (
    <div>
      <div className={cs.authWrapper}>
        <div className={cs.authHeader}>
          <span>RQS</span>
        </div>
        <main>
          <Outlet />
        </main>
      </div>
      <footer className={cs.authFooter}>Copyright 2022. OFASHION all rights reserved.</footer>
    </div>
  );
};

export default AuthWrapper;
