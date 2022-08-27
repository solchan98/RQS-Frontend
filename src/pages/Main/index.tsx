import cs from './main.module.scss';
import { Search } from 'assets/svgs';
import { SpaceList } from './SpaceList';
import { ScrapList } from './ScrapList';

export const Main = () => {
  return (
    <div className={cs.container}>
      <div className={cs.top}>
        <h3 className={cs.intro}>Mark님 반갑습니다.</h3>
        <form className={cs.searchForm} id='searchSpace'>
          <Search />
          <input type='text' form='searchSpace' placeholder='스페이스 검색' />
        </form>
      </div>
      <main className={cs.main}>
        <section>
          <SpaceList />
        </section>
        <section>
          <ScrapList />
        </section>
      </main>
      <footer className={cs.footer}>Copyright 2022. RQS all rights reserved.</footer>
    </div>
  );
};
