import cs from './explore.module.scss';
import { SpaceItem } from './SpaceItem';

export const Explore = () => {
  return (
    <div className={cs.exploreContainer}>
      <div className={cs.exploreTop}>Explore</div>
      <ul className={cs.exploreCardList}>
        <li className={cs.exploreCard}>
          <SpaceItem />
        </li>
        <li className={cs.exploreCard}>
          <SpaceItem />
        </li>
        <li className={cs.exploreCard}>
          <SpaceItem />
        </li>
        <li className={cs.exploreCard}>
          <SpaceItem />
        </li>
        <li className={cs.exploreCard}>
          <SpaceItem />
        </li>
        <li className={cs.exploreCard}>
          <SpaceItem />
        </li>
        <li className={cs.exploreCard}>
          <SpaceItem />
        </li>
      </ul>
    </div>
  );
};
