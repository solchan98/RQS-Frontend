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
          <span className={cs.timestamp}>{timeAgo.format(new Date(item.createdAt))}</span>
        </div>
      </div>
      <div className={cs.itemMain}>{item.question}</div>
      <div className={cs.itemBottom}>
        <ul className={cs.hintList}>
          {item.hint.split(',').map((hint) => (
            <li key={hint} className={cs.hint}>
              {hint}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
