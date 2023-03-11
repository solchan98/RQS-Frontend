import cs from './oauth.module.scss';
import cx from 'classnames';
import { GoogleLogin, KakaoLogin } from 'assets/svgs';

const google =
  'https://accounts.google.com/o/oauth2/v2/auth?client_id=751204375055-hp0dl77isgfllta0c2ps76jlqg2ccsao.apps.googleusercontent.com&redirect_uri=http://localhost:3000/oauth/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';

const kakao =
  'https://kauth.kakao.com/oauth/authorize?client_id=4a07e318a99998cbe9c9c818bc51cfdf&redirect_uri=http://localhost:3000/oauth/kakao&response_type=code';

export const Oauth = () => {
  return (
    <div className={cs.oauth}>
      <a href={google} className={cx(cs.oauthBtn, cs.google)}>
        <GoogleLogin width='32px' height='32px' />
        Google
      </a>
      <a href={kakao} className={cx(cs.oauthBtn, cs.kakao)}>
        <KakaoLogin width='32px' height='32px' />
        Kakao
      </a>
    </div>
  );
};
