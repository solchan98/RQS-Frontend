import store from 'store';
import { useMount } from 'react-use';
import jwtDecode from 'jwt-decode';
import { useSetRecoilState } from 'recoil';
import { Navigate, Route, Routes } from 'react-router-dom';

import { memberState } from 'recoil/atoms/member';
import { IMemberSubject } from 'types/member';

import { Login } from 'components/Login';
import AuthWrapper from 'pages/AuthWapper';
import { Space } from 'pages/Space';
import { UpdateSpace } from 'pages/UpdateSpace';
import { UpdateQuiz } from 'pages/UpdateQuiz';
import { SignUp } from './components/SignUp';
import { Layout } from './components/Layout';
import { Main } from './pages/Main';
import { Trending } from './pages/Main/Trending';
import { MemberSpace } from './pages/MemberPage/MemberSpace';
import { MemberPage } from './pages/MemberPage';
import { MemberScrap } from './pages/MemberPage/MemberScrap';
import { tokenChecker } from './util/token';
import { JoinSpace } from './pages/JoinSpace';
import { UpdateProfile } from './pages/UpdateProfile';
import { Oauth } from './pages/Oauth';
import { Quiz } from './pages/Quiz';
import { FormQuiz } from './pages/Quiz/FormQuiz';
import { CreateQuiz } from './pages/CreateQuiz';
import { MultiQuiz } from './pages/Quiz/MultiQuiz';
import { CreateChildQuiz } from './pages/CreateChildQuiz';

const App = () => {
  const setMemberValue = useSetRecoilState(memberState);

  const loadMemberInfoSuccessHandler = (data: IMemberSubject) => {
    const { memberId, email, nickname, avatar } = data;
    setMemberValue((prev) => ({
      ...prev,
      memberId,
      email,
      nickname,
      avatar: avatar ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      isLoggedIn: true,
    }));
  };

  useMount(() => {
    const atk = store.get('atk');
    tokenChecker(atk).then(() => {
      const checkedAtk = store.get('atk');
      if (checkedAtk) {
        const decoded: { exp: number; iat: number; sub: string } = jwtDecode(checkedAtk);
        loadMemberInfoSuccessHandler(JSON.parse(decoded.sub));
      }
    });
  });

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Main />}>
          <Route path='' element={<Navigate to='trending' />} />
          <Route path='trending' element={<Trending />} />
        </Route>
        <Route path='join' element={<JoinSpace />} />
        <Route path='space'>
          <Route path=':spaceId' element={<Space />} />
          <Route path=':spaceId/setting' element={<UpdateSpace />} />
        </Route>
        <Route path='quiz'>
          <Route path='setting/:quizId' element={<UpdateQuiz />} />
        </Route>
        <Route path='space'>
          <Route path=':spaceId/quiz'>
            <Route path='' element={<Quiz />} />
            <Route path='form' element={<FormQuiz />} />
            <Route path='multi' element={<MultiQuiz />} />
            <Route path=':parentId/new' element={<CreateChildQuiz />} />
            <Route path='new' element={<CreateQuiz />} />
          </Route>
        </Route>
        <Route path=':memberId' element={<MemberPage />}>
          <Route path='' element={<Navigate to='./space' />} />
          <Route path='space' element={<MemberSpace />} />
          <Route path='scrap' element={<MemberScrap />} />
        </Route>
        <Route path='update/member/:memberId' element={<UpdateProfile />} />
      </Route>
      <Route path='auth' element={<AuthWrapper />}>
        <Route path='' element={<Navigate to='login' />} />
        <Route path='login' element={<Login />} />
        <Route path='sign-up' element={<SignUp />} />
      </Route>
      <Route path='oauth/:type' element={<Oauth />} />
    </Routes>
  );
};

export default App;
