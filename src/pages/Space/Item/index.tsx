import timeAgo from 'util/timaAgo';
import { Link } from 'react-router-dom';

import { IItem } from 'types/item';

import cs from './item.module.scss';
import { Setting } from 'assets/svgs';
import { Box, Collapse, Textarea, useDisclosure } from '@chakra-ui/react';

const TEMP_AVATAR = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

interface Props {
  item: IItem;
  isUpdatable: boolean;
}

export const Item = ({ item, isUpdatable }: Props) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <button type='button' onClick={onToggle} className={cs.container}>
      <div className={cs.top}>
        <Link className={cs.avatar} to='#'>
          <img src={item.spaceMemberResponse?.avatar ?? TEMP_AVATAR} alt='profile_img' />
        </Link>
        <div className={cs.topSide}>
          <span className={cs.nickname}>{item.spaceMemberResponse.nickname}</span>
          <span className={cs.timestamp}>{timeAgo.format(new Date(item.createdAt))}</span>
          {isUpdatable && (
            <Link className={cs.setting} to={`/item/${item.itemId}/setting`}>
              <Setting />
            </Link>
          )}
        </div>
      </div>
      <div className={cs.main}>{item.question}</div>
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
      <Collapse className={cs.answer} in={isOpen} animateOpacity>
        <Box display='flex'>
          <Textarea className={cs.textarea} rows={item.answer.split('\n').length - 1} value={item.answer} isReadOnly />
        </Box>
      </Collapse>
    </button>
  );
};
