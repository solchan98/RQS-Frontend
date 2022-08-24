import cs from './main.module.scss';
import { MainLottie } from '../../components/Lotties/MainLottie';

export const Main = () => {
  return (
    <div className={cs.container}>
      <MainLottie />
      <div>
        <span>현재 생성된 스페이스 수</span>
        <span>12개</span>
      </div>
      <div>
        <span>공개중인 스페이스 수</span>
        <span>0개</span>
      </div>
    </div>
  );
};
