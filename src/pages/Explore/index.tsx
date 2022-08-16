import cs from './explore.module.scss';

export const Explore = () => {
  return (
    <div className={cs.exploreContainer}>
      <div className={cs.exploreTop}>Explore</div>
      <ul className={cs.exploreCardList}>
        <li className={cs.exploreCard}>아이템</li>
        <li className={cs.exploreCard}>아이템</li>
        <li className={cs.exploreCard}>아이템</li>
      </ul>
    </div>
  );
};
