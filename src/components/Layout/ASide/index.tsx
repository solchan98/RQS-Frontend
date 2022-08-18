import { MouseEventHandler, useState } from 'react';
import { useModal } from 'hooks/useModal';

import { MySpaces } from './MySpaces';
import { Scraps } from './Scrap';
import { Add } from 'assets/svgs';

import cx from 'classnames';
import cs from './aside.module.scss';

export const ASide = () => {
  const [navState, setNavState] = useState('space');

  const onClickNav: MouseEventHandler<HTMLButtonElement> = (e) => {
    const state = e.currentTarget.dataset.id ?? 'space';
    setNavState(state);
  };

  const createSpace = useModal();

  return (
    <aside className={cs.layoutAside}>
      <div className={cs.asideTop}>
        <nav>
          <button
            type='button'
            data-id='space'
            className={cx(cs.asideTitle, navState === 'space' && cs.activeNav)}
            onClick={onClickNav}
          >
            스페이스
          </button>
          <button
            type='button'
            data-id='scrap'
            className={cx(cs.asideTitle, navState === 'scrap' && cs.activeNav)}
            onClick={onClickNav}
          >
            스크랩
          </button>
        </nav>
        {navState === 'space' && (
          <button className={cs.addButton} type='button' onClick={createSpace.openModal}>
            <Add />
          </button>
        )}
      </div>
      {navState === 'space' ? <MySpaces /> : <Scraps />}
    </aside>
  );
};
