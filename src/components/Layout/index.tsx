import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { ASide } from './ASide';

import cs from './layout.module.scss';

export const Layout = () => {
  return (
    <div className={cs.layout}>
      <Header />
      <main>
        <ASide />
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
};
