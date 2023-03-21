import { Link, Outlet } from 'react-router-dom';

import { MainLottie } from 'components/Lotties/MainLottie';

import cs from './main.module.scss';

export const Main = () => {
  return (
    <div className={cs.container}>
      <section className={cs.intro}>
        <MainLottie />
        <span className={cs.introText}>질문리스트를 만들어 랜덤 질문을 만나보세요!</span>
        <Link className={cs.startLink} to='auth/sign-up'>
          시작하기
        </Link>
      </section>
      <main className={cs.main}>
        <div className={cs.contentSelector}>
          <div className={cs.infoWrapper}>
            <h3 className={cs.subTitle}>Spaces</h3>
            <Link className={cs.joinLink} to='/join'>
              코드로 참여하기
            </Link>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
};
