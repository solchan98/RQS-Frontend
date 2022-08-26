import cs from './main.module.scss';
import { Link } from 'react-router-dom';
import { Search } from 'assets/svgs';
import { Space } from 'components/Space';

const AVATAR = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

export const Main = () => {
  return (
    <div className={cs.container}>
      <div className={cs.top}>
        <div className={cs.profileWrapper}>
          <Link className={cs.avatar} to='#'>
            <img src={AVATAR} alt='profile_image' />
          </Link>
        </div>
        <h3 className={cs.intro}>Mark님 반갑습니다.</h3>
        <form className={cs.searchForm} id='searchSpace'>
          <Search />
          <input type='text' form='searchSpace' placeholder='스페이스 검색' />
        </form>
      </div>
      <main className={cs.main}>
        <section>
          <div className={cs.listTop}>
            <h3>나의 스페이스</h3>
            <button className={cs.viewMore} type='button'>
              View more
            </button>
          </div>
          <ul className={cs.listContent}>
            <li>
              <Link to='#'>
                <Space />
              </Link>
            </li>
            <li>
              <Link to='#'>
                <Space />
              </Link>
            </li>
            <li>
              <Link to='#'>
                <Space />
              </Link>
            </li>
            <li>
              <Link to='#'>
                <Space />
              </Link>
            </li>
          </ul>
        </section>
        <section>
          <div className={cs.listTop}>
            <h3>나의 스크랩</h3>
            <button className={cs.viewMore} type='button'>
              View more
            </button>
          </div>
          <ul className={cs.listContent}>
            <li>
              <Link to='#'>
                <Space />
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};
