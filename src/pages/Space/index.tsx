import cs from './space.module.scss';
import { Item } from './Item';
import { useModal } from '../../hooks/useModal';
import { CreateQModal } from '../../components/CreateQModal';

export const Space = () => {
  const createQuestion = useModal();
  const randomQuestion = useModal();

  return (
    <div className={cs.spaceContainer}>
      <div className={cs.itemTop}>백엔드 면접 예상 질문 모음</div>
      <div className={cs.itemButtonWrapper}>
        <button type='button' onClick={randomQuestion.openModal}>
          랜덤 질문 시작
        </button>
        <button type='button' onClick={createQuestion.openModal}>
          질문 생성
        </button>
        <CreateQModal useModal={createQuestion} />
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
