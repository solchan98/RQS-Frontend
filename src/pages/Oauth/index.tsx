import QueryString from 'qs';
import { useMount } from 'react-use';
import { useSetRecoilState } from 'recoil';
import { memberState } from 'recoil/atoms/member';
import { useLocation, useParams } from 'react-router-dom';

import { oauthLogin } from 'service/member';
import { IMemberResponse } from 'types/member';
import { useLoginSuccess } from 'hooks/useLoginSuccess';

import cs from './oauthPage.module.scss';

export const Oauth = () => {
  const params = useParams();
  const location = useLocation();

  const setMemberValue = useSetRecoilState(memberState);
  const loginSuccess = useLoginSuccess(setMemberValue);

  useMount(() => {
    const code = String(QueryString.parse(location.search.replace('?', '')).code);
    const type = String(params.type);
    oauthLogin(code, type)
      .then((data: IMemberResponse) => loginSuccess(data))
      .catch((err) => console.log(err));
  });
  return (
    <div className={cs.container}>
      <div>로그인 확인중...</div>
    </div>
  );
};
