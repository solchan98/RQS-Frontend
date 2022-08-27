import cs from '../main.module.scss';
import { Link } from 'react-router-dom';

export const ScrapList = () => {
  return (
    <>
      <div className={cs.listTop}>
        <h3 className={cs.subTitle}>나의 스크랩</h3>
      </div>
      <ul className={cs.listContent}>
        <li>
          <Link to='#'>{/* <Space /> */}</Link>
        </li>
      </ul>
    </>
  );
};
