import Lottie from 'react-lottie';

import data from 'assets/lottie/login.json';

const lottieOptions = {
  animationData: data,
  loop: true,
  autoplay: true,
};

export const LoginLottie = () => {
  return (
    <div>
      <Lottie options={lottieOptions} isClickToPauseDisabled={false} style={{ width: '300px', height: '300px' }} />
    </div>
  );
};
