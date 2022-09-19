import cs from './joinSpace.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useMount } from 'react-use';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';

interface IItkSubject {
  spaceId: number;
  spaceTitle: string;
  inviterId: number;
  inviterNickname: string;
}

export const JoinSpace = () => {
  const { itk } = useParams();

  const [itkSub, setItkSub] = useState<IItkSubject | undefined>();

  useMount(() => {
    if (itk) {
      const decoded: { exp: number; iat: number; sub: string } = jwtDecode(itk);
      setItkSub(JSON.parse(decoded.sub));
    }
  });

  if (!itkSub) return <div>로딩중...</div>;

  return (
    <div className={cs.container}>
      <div className={cs.top}>
        <h3 className={cs.title}>{itkSub.spaceTitle}</h3>
        <h3 className={cs.title}>스페이스로 초대합니다!</h3>
      </div>
      <div className={cs.main}>
        <p className={cs.info}>
          <mark className={cs.highlight}>&nbsp;{`${itkSub?.inviterNickname}`}</mark> 님이{' '}
          <mark className={cs.highlight}>{`"${itkSub?.spaceTitle}"`}</mark> 스페이스로 초대하셨습니다.
        </p>
        <p>Member 권한으로 참여하시겠습니까?</p>
        <form className={cs.joinSpaceForm} id='joinSpace'>
          <button className={cs.joinButton} type='submit' form='joinSpace'>
            참여하기
          </button>
          <Link className={cs.toHomeButton} to='/'>
            홈으로
          </Link>
        </form>
      </div>
      <footer className={cs.footer}>Copyright 2022. RQS all rights reserved.</footer>
    </div>
  );
};
