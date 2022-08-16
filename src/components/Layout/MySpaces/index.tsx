import { Link } from 'react-router-dom';

import { Add } from '../../../assets/svgs';
import cs from './mySpace.module.scss';

export const MySpaces = () => {
  return (
    <aside className={cs.layoutAside}>
      <div className={cs.asideTop}>
        <span className={cs.asideTitle}>My Spaces</span>
        <button className={cs.addButton} type='button'>
          <Add />
        </button>
      </div>
      <ul className={cs.asideSpaceList}>
        <li>
          <Link to='#'>백엔드 면접 예상 질문 모음</Link>
        </li>
        <li className={cs.scrapSpace}>
          <Link to='#'>프론트엔드 면접 예상 질문 모음음음음음음</Link>
        </li>
        <li>
          <Link to='#'>스프링 개념 체크 질문 모음</Link>
        </li>
      </ul>
      <button className={cs.asideShowMore} type='button'>
        Show more
      </button>
    </aside>
  );
};
