import { Link, NavLink, Outlet } from 'react-router-dom';

import { MainLottie } from 'components/Lotties/MainLottie';

import cs from './main.module.scss';
import cx from 'classnames';

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
          {/* <div className={cs.contentTitle}>🗺 탐색하기</div> */}
          <div className={cs.switch}>
            <NavLink className={({ isActive }) => cx(cs.el, isActive && cs.selected)} to='/trending'>
              🌟 트렌딩
            </NavLink>
            <NavLink className={({ isActive }) => cx(cs.el, isActive && cs.selected)} to='/newest'>
              🔥 최신순
            </NavLink>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
};
