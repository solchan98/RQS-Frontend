import Lottie from 'react-lottie-player';
import data from 'assets/lottie/login.json';

import cs from './lottieCommon.module.scss';

export const LoginLottie = () => {
  return (
    <div className={cs.lottie}>
      <Lottie loop play animationData={data} style={{ width: '450px', height: '450px', margin: '0 auto' }} />
    </div>
  );
};
