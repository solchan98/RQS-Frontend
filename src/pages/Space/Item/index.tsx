import { useRecoilValue } from 'recoil';
import timeAgo from 'util/timaAgo';
import { Link } from 'react-router-dom';

import { memberState } from 'recoil/atoms/member';
import { IItem } from 'types/item';

import cs from './item.module.scss';
import { Setting } from 'assets/svgs';

const TEMP_AVATAR = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

interface Props {
  item: IItem;
}

export const Item = ({ item }: Props) => {
  const { email } = useRecoilValue(memberState);

  return (
    <div className={cs.container}>
      <div className={cs.top}>
        <Link className={cs.avatar} to='#'>
          <img src={item.spaceMemberResponse?.avatar ?? TEMP_AVATAR} alt='profile_img' />
        </Link>
        <div className={cs.topSide}>
          <span className={cs.nickname}>{item.spaceMemberResponse.nickname}</span>
          <span className={cs.timestamp}>{timeAgo.format(new Date(item.createdAt))}</span>
          {email === item.spaceMemberResponse.email && (
            <Link className={cs.setting} to={`./item/${item.itemId}/setting`}>
              <Setting />
            </Link>
          )}
        </div>
      </div>
      <button type='button' className={cs.main}>
        {item.question}
      </button>
      <div className={cs.bottom}>
        <ul className={cs.hintList}>
          {item.hint.length !== 0 &&
            item.hint.split(',').map((hint) => (
              <li key={hint} className={cs.hint}>
                {hint}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
