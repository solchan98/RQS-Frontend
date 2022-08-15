import cs from './layout.module.scss';
import { Header } from './Header';
import { MySpaces } from './MySpaces';

export const Layout = () => {
  return (
    <div className={cs.layout}>
      <Header />
      <main>
        <MySpaces />
        <section />
      </main>
    </div>
  );
};
