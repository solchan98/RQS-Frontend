import { useRecoilValue } from 'recoil';
import { Link, Outlet } from 'react-router-dom';

import { memberState } from 'recoil/atoms/member';

import { Avatar } from '../Avatar';
import { Search } from 'assets/svgs';
import cs from './layout.module.scss';

export const Layout = () => {
  const { isLoggedIn, memberId, avatar } = useRecoilValue(memberState);

  return (
    <div className={cs.container}>
      <div className={cs.header}>
        <Link className={cs.logo} to='/'>
          <span className={cs.title}>Quiz Box</span>
        </Link>
        <div className={cs.rightSection}>
          <form className={cs.searchForm} id='searchSpace'>
            <Search />
            <input type='text' form='searchSpace' placeholder='스페이스 검색' />
          </form>
          {isLoggedIn ? (
            <Avatar memberId={memberId} src={avatar} />
          ) : (
            <Link to='auth/login'>
              <button className={cs.signInBtn} type='button'>
                로그인
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className={cs.body}>
        <Outlet />
      </div>
      <footer className={cs.footer}>Copyright 2022. RQS all rights reserved.</footer>
    </div>
  );
};
