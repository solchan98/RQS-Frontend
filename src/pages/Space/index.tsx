import { useRecoilValue } from 'recoil';
import { Image } from '@chakra-ui/react';
import { memberState } from 'recoil/atoms/member';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { IQuiz } from 'types/quiz';
import { ISpace } from 'types/space';
import { getSpace } from 'service/spaces';
import { getQuizzes } from 'service/quizzes';
import { useFetchError } from 'hooks/useFetchError';

import { Item } from './Item';
import cs from './space.module.scss';
import { Add, Members, Play, Question } from 'assets/svgs';

const DEFAULT_THUMBNAIL = 'https://cdn.pixabay.com/photo/2020/03/21/14/45/rocket-4954229_1280.jpg';

export const Space = () => {
  const { spaceId } = useParams();

  const onFetchError = useFetchError();
  const { data: space } = useQuery([`#space_${spaceId}`], () => getSpace(Number(spaceId)), {
    select: (data): ISpace => data,
    onError: onFetchError,
  });

  const {
    data: quizzes,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery([`#quizzes_${spaceId}`], ({ pageParam = undefined }) => getQuizzes(Number(spaceId), pageParam), {
    getNextPageParam: (quizzesResponse: IQuiz[]) =>
      quizzesResponse.length !== 0 && quizzesResponse[quizzesResponse.length - 1].quizId,
    onError: onFetchError,
  });

  const { isLoggedIn, email } = useRecoilValue(memberState);
  const nav = useNavigate();
  const onQuizStartHandler = () => {
    if (isLoggedIn) {
      nav(`/space/${spaceId}/quiz `);
    } else {
      alert('로그인이 필요합니다.');
    }
  };
  const isSpaceAdmin = () => space?.authority === 'ADMIN';
  const isSpaceMember = () => space?.authority === 'ADMIN' || space?.authority === 'MEMBER';

  return (
    <div className={cs.container}>
      <div className={cs.top}>
        <div className={cs.section}>
          <div className={cs.contentWrapper}>
            <div className={cs.leftContent}>
              <Image className={cs.image} boxSize='180px' src={space?.imageUrl ?? DEFAULT_THUMBNAIL} />
            </div>
            <div className={cs.rightContent}>
              <div className={cs.title}>{space?.title}</div>
              <div className={cs.content}>{space?.content}</div>
            </div>
          </div>
          {isSpaceAdmin() && (
            <Link className={cs.setting} to='./setting'>
              수정
            </Link>
          )}
        </div>
        <div className={cs.status}>
          <div className={cs.cntWrapper}>
            <Question />
            <span>{space?.quizCount}</span>
          </div>
          <div className={cs.cntWrapper}>
            <Members />
            <span>{space?.spaceMemberCount}</span>
          </div>
        </div>
      </div>
      <main className={cs.main}>
        <div className={cs.mainTop}>
          <div className={cs.infoWrapper}>
            <h3 className={cs.subTitle}>Quizzes</h3>
          </div>
          <button className={cs.playButton} type='button' onClick={onQuizStartHandler}>
            <Play />
          </button>
        </div>
        <ul className={cs.quizList}>
          {isSpaceMember() && (
            <button className={cs.addBtn} type='button' onClick={() => nav('./quiz/new')}>
              <Add />
            </button>
          )}
          {quizzes?.pages.map((page) =>
            page.map((quiz) => (
              <li key={quiz.quizId}>
                <Item quiz={quiz} isUpdatable={email === quiz.spaceMemberResponse.email} />
              </li>
            ))
          )}
        </ul>
        {hasNextPage && (
          <div className={cs.refetchBtnWrapper}>
            <button className={cs.btn} type='button' onClick={() => fetchNextPage()}>
              더보기
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
