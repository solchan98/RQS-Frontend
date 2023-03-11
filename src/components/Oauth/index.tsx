import cs from './oauth.module.scss';
import cx from 'classnames';
import { GoogleLogin, KakaoLogin } from 'assets/svgs';

const google =
  'https://accounts.google.com/o/oauth2/v2/auth?client_id=528149101516-tktuilpiq62vkflrqvs83g118s7n1pm0.apps.googleusercontent.com&redirect_uri=https://quiz-box.shop/oauth/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';

const kakao =
  'https://kauth.kakao.com/oauth/authorize?client_id=cc1dfb0ff3ba6fc45a04a2771433fd75&redirect_uri=https://quiz-box.shop/oauth/kakao&response_type=code';

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
