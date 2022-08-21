import Lottie from 'react-lottie-player';
import data from 'assets/lottie/login.json';

export const LoginLottie = () => {
  return (
    <div>
      <Lottie loop play animationData={data} style={{ width: '300px', height: '300px', margin: '0 auto' }} />
    </div>
  );
};
