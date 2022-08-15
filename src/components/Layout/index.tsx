import cs from './layout.module.scss';
import { Header } from './Header';

export const Layout = () => {
  return (
    <div className={cs.layout}>
      <Header />
      <main>
        <aside />
        <section />
      </main>
    </div>
  );
};
