import cs from './oauth.module.scss';
import cx from 'classnames';
import { GoogleLogin, KakaoLogin } from 'assets/svgs';

export const Oauth = () => {
  return (
    <div className={cs.oauth}>
      <a href={String(process.env.REACT_APP_GOOGLE_LOGIN_REDIRECT_URL)} className={cx(cs.oauthBtn, cs.google)}>
        <GoogleLogin width='32px' height='32px' />
        Google
      </a>
      <a href={String(process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URL)} className={cx(cs.oauthBtn, cs.kakao)}>
        <KakaoLogin width='32px' height='32px' />
        Kakao
      </a>
    </div>
  );
};
