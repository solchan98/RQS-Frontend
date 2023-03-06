import cs from './oauth.module.scss';
import cx from 'classnames';
import { GoogleLogin, KakaoLogin } from 'assets/svgs';

export const Oauth = () => {
  const onClick = () => alert('oauth 로그인은 준비중입니다! 🚀');

  return (
    <div className={cs.oauth}>
      <button type='button' onClick={onClick} className={cx(cs.oauthBtn, cs.google)}>
        <GoogleLogin width='32px' height='32px' />
        Google
      </button>
      <button type='button' onClick={onClick} className={cx(cs.oauthBtn, cs.kakao)}>
        <KakaoLogin width='32px' height='32px' />
        Kakao
      </button>
    </div>
  );
};
