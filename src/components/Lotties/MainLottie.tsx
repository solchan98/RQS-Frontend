import Lottie from 'react-lottie-player';

import data from 'assets/lottie/main.json';

export const MainLottie = () => {
  return (
    <div>
      <Lottie loop play animationData={data} style={{ width: '240px', height: '240px' }} />
    </div>
  );
};
