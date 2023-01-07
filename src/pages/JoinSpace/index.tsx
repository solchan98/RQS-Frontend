import jwtDecode from 'jwt-decode';
import { useMount } from 'react-use';
import { FormEventHandler, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { joinSpaceWithToken } from 'service/spaces';
import { useLogout } from 'hooks/useLogout';

import cs from './joinSpace.module.scss';

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

  const nav = useNavigate();
  const joinSpaceSuccessHandler = () => {
    alert(`${itkSub?.spaceTitle} 성공적으로 참여하였습니다!`);
    nav(`/space/${itkSub?.spaceId}`);
  };

  const logout = useLogout();
  const joinSpace: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!itk) {
      alert('토큰이 올바르지 않습니다.');
    } else {
      joinSpaceWithToken(itk)
        .then(joinSpaceSuccessHandler)
        .catch((err) => (err.response?.status === 401 ? logout() : alert(err.response?.data.message)));
    }
  };

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
        <form className={cs.joinSpaceForm} id='joinSpace' onSubmit={joinSpace}>
          <button className={cs.joinButton} type='submit' form='joinSpace'>
            참여하기
          </button>
          <Link className={cs.toHomeButton} to='/'>
            홈으로
          </Link>
        </form>
      </div>
    </div>
  );
};
