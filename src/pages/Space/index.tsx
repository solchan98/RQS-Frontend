import cs from './space.module.scss';
import { Item } from './Item';

export const Space = () => {
  return (
    <div className={cs.spaceContainer}>
      <div className={cs.itemTop}>백엔드 면접 예상 질문 모음</div>
      <div className={cs.itemButtonWrapper}>
        <button type='button'>랜덤 질문 시작</button>
        <button type='button'>질문 생성</button>
      </div>
      <ul className={cs.itemCardList}>
        <li className={cs.itemCard}>
          <button type='button' onClick={() => console.log('1')}>
            <Item />
          </button>
        </li>
        <li className={cs.itemCard}>
          <button type='button' onClick={() => console.log('1')}>
            <Item />
          </button>
        </li>
        <li className={cs.itemCard}>
          <button type='button' onClick={() => console.log('1')}>
            <Item />
          </button>
        </li>
        <li className={cs.itemCard}>
          <button type='button' onClick={() => console.log('1')}>
            <Item />
          </button>
        </li>
        <li className={cs.itemCard}>
          <button type='button' onClick={() => console.log('1')}>
            <Item />
          </button>
        </li>
        <li className={cs.itemCard}>
          <button type='button' onClick={() => console.log('1')}>
            <Item />
          </button>
        </li>
        <li className={cs.itemCard}>
          <button type='button' onClick={() => console.log('1')}>
            <Item />
          </button>
        </li>
        <li className={cs.itemCard}>
          <button type='button' onClick={() => console.log('1')}>
            <Item />
          </button>
        </li>
      </ul>
    </div>
  );
};
