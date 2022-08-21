import Lottie from 'react-lottie';

import data from 'assets/lottie/start.json';

const lottieOptions = {
  animationData: data,
  loop: true,
  autoplay: true,
};

export const StartLottie = () => {
  return (
    <div>
      <Lottie options={lottieOptions} isClickToPauseDisabled={false} style={{ width: '240px', height: '240px' }} />
    </div>
  );
};
