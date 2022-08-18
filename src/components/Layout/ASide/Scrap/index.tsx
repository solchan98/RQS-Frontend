import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import cs from './scrap.module.scss';

export const Scraps = () => {
  useEffect(() => {
    console.log('hello!');
  }, []);
  return (
    <>
      <ul className={cs.asideScrapList}>
        <li>
          <Link to='/space/1'>백엔드 면접 예상 질문 모음</Link>
        </li>
        <li>
          <Link to='/space/2'>프론트엔드 면접 예상 질문 모음음음음음음</Link>
        </li>
        <li>
          <Link to='/space/3'>스프링 개념 체크 질문 모음</Link>
        </li>
      </ul>
      <button className={cs.asideShowMore} type='button'>
        Show more
      </button>
    </>
  );
};
