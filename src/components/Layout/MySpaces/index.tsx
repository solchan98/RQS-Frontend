import { Link } from 'react-router-dom';

import { Add } from '../../../assets/svgs';
import cs from './mySpace.module.scss';
import { ModalTemplate } from '../../ModalTemplate';
import { useModal } from '../../../hooks/useModal';

export const MySpaces = () => {
  const createSpace = useModal();

  return (
    <aside className={cs.layoutAside}>
      <div className={cs.asideTop}>
        <span className={cs.asideTitle}>My Spaces</span>
        <button className={cs.addButton} type='button' onClick={createSpace.openModal}>
          <Add />
        </button>
        <ModalTemplate isOpen={createSpace.isOpen} closeModal={createSpace.closeModal} portalClassName='createSpace'>
          <div>스페이스 생성 모달</div>
        </ModalTemplate>
      </div>
      <ul className={cs.asideSpaceList}>
        <li>
          <Link to='/space/1'>백엔드 면접 예상 질문 모음</Link>
        </li>
        <li className={cs.scrapSpace}>
          <Link to='/space/2'>프론트엔드 면접 예상 질문 모음음음음음음</Link>
        </li>
        <li>
          <Link to='/space/3'>스프링 개념 체크 질문 모음</Link>
        </li>
      </ul>
      <button className={cs.asideShowMore} type='button'>
        Show more
      </button>
    </aside>
  );
};
