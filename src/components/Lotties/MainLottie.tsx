import Lottie from 'react-lottie-player';
import data from '../../assets/lottie/main.json';

export const MainLottie = () => {
  return (
    <div>
      <Lottie loop play animationData={data} style={{ width: '300px', height: '300px', margin: '0 auto' }} />
    </div>
  );
};
