import cs from './explore.module.scss';
import { SpaceItem } from './SpaceItem';

export const Explore = () => {
  return (
    <div className={cs.exploreContainer}>
      <div className={cs.exploreTop}>Explore</div>
      <ul className={cs.exploreCardList}>
        <li className={cs.exploreCard}>
          <button type='button' onClick={() => console.log('1')}>
            <SpaceItem />
          </button>
        </li>
        <li className={cs.exploreCard}>
          <button type='button' onClick={() => console.log('1')}>
            <SpaceItem />
          </button>
        </li>
        <li className={cs.exploreCard}>
          <button type='button' onClick={() => console.log('1')}>
            <SpaceItem />
          </button>
        </li>
        <li className={cs.exploreCard}>
          <button type='button' onClick={() => console.log('1')}>
            <SpaceItem />
          </button>
        </li>
        <li className={cs.exploreCard}>
          <button type='button' onClick={() => console.log('1')}>
            <SpaceItem />
          </button>
        </li>
        <li className={cs.exploreCard}>
          <button type='button' onClick={() => console.log('1')}>
            <SpaceItem />
          </button>
        </li>
      </ul>
    </div>
  );
};
