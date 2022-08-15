import cs from './layout.module.scss';
import { Link } from 'react-router-dom';
import { Logo } from './Header/Logo';

export const Layout = () => {
  return (
    <div className={cs.layout}>
      <header>
        <div>
          <Logo size={42} color='#000' />
          <form>
            <input />
            서치바
          </form>
          <div>
            <button>종</button>
            <Link to='#'>프로필 원</Link>
          </div>
        </div>
      </header>
      <main>
        <aside />
        <section />
      </main>
    </div>
  );
};
