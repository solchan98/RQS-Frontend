import { Link } from 'react-router-dom';
import timeAgo from 'util/timaAgo';

import { IItem } from 'types/item';

import cs from './item.module.scss';

const TEMP_NICKNAME = 'Sol';
const TEMP_AVATAR = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

interface Props {
  item: IItem;
}

export const Item = ({ item }: Props) => {
  return (
    <>
      <div className={cs.itemTop}>
        <Link className={cs.avatar} to='#'>
          <img src={item.spaceMemberResponse?.avatar ?? TEMP_AVATAR} alt='profile_img' />
        </Link>
        <div className={cs.itemTopSide}>
          <span className={cs.profileNickname}>{item.spaceMemberResponse?.nickname ?? TEMP_NICKNAME}</span>
          {/* TODO: createdAT 받아와서 시간 라이브러리 사용하여 적용 */}
          <span className={cs.timestamp}>{timeAgo.format(new Date(item.createdAt))}</span>
        </div>
      </div>
      <div className={cs.itemMain}>{item.question}</div>
    </>
  );
};
