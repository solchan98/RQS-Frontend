import { useMount } from 'react-use';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { getAsideMySpaceList } from 'service/spaces';
import { memberState } from 'recoil/atoms/member';
import { ISpace } from 'types/space';
import { spaceListState } from 'recoil/atoms/spaces';

import cs from './mySpace.module.scss';

export const MySpaces = () => {
  const { email } = useRecoilValue(memberState);
  const [spaceListValue, setSpaceListValue] = useRecoilState(spaceListState);

  const mySpaceListSuccessHandler = (data: ISpace[]) =>
    data.length === 0
      ? setSpaceListValue((prev) => ({ ...prev, isLast: true }))
      : setSpaceListValue((prev) => ({ ...prev, spaceList: [...prev.spaceList, ...data] }));

  const loadMore = () => {
    if (spaceListValue.isLast) return;
    getAsideMySpaceList(email, spaceListValue.spaceList[spaceListValue.spaceList.length - 1])
      .then((data) => mySpaceListSuccessHandler(data))
      .catch((err) => console.log(err));
  };

  useMount(() => {
    setSpaceListValue({ isLast: false, spaceList: [] });
    getAsideMySpaceList(email)
      .then((data) => mySpaceListSuccessHandler(data))
      .catch((err) => console.log(err));
  });
  return (
    <>
      <ul className={cs.asideSpaceList}>
        {spaceListValue.spaceList.map((space: ISpace) => (
          <li key={space.spaceId}>
            <Link to={`/space/${space.spaceId}`}>{space.title}</Link>
          </li>
        ))}
      </ul>
      {!spaceListValue.isLast && (
        <button className={cs.asideShowMore} type='button' onClick={loadMore}>
          Show more
        </button>
      )}
    </>
  );
};
