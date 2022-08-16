import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { MySpaces } from './MySpaces';

import cs from './layout.module.scss';

export const Layout = () => {
  return (
    <div className={cs.layout}>
      <Header />
      <main>
        <MySpaces />
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
};
