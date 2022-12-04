import store from 'store';
import { useMount } from 'react-use';
import jwtDecode from 'jwt-decode';
import { useRecoilState } from 'recoil';
import { Navigate, Route, Routes } from 'react-router-dom';

import { memberState } from 'recoil/atoms/member';
import { IMemberSubject } from 'types/member';

import { Login } from 'components/Login';
import AuthWrapper from 'pages/AuthWapper';
import { Space } from 'pages/Space';
import { UpdateSpace } from 'pages/UpdateSpace';
import { UpdateItem } from 'pages/UpdateItem';
import { SignUp } from './components/SignUp';
import { Layout } from './components/Layout';
import { Main } from './pages/Main';
import { Trending } from './pages/Main/Trending';
import { Newest } from './pages/Main/Newest';
import { MemberSpace } from './pages/MemberPage/MemberSpace';
import { MemberPage } from './pages/MemberPage';
import { MemberScrap } from './pages/MemberPage/MemberScrap';
import { tokenChecker } from './util/token';

const App = () => {
  const [memberValue, setMemberValue] = useRecoilState(memberState);

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
      {/* <Route path='' element={atk || memberValue.isLoggedIn ? <Layout /> : <Navigate to='auth/login' />}> */}
      {/*  <Route path='' element={<Main />} /> */}
      {/*  <Route path='join/:itk' element={<JoinSpace />} /> */}
      {/*  <Route path='space/:spaceId' element={<Space />} /> */}
      {/*  <Route path='space/:spaceId/setting' element={<UpdateSpace />} /> */}
      {/*  <Route path='item/:itemId/setting' element={<UpdateItem />} /> */}
      {/*  <Route path='profile/:memberId' element={<UpdateProfile />} /> */}
      {/* </Route> */}
      {/* <Route path='auth' element={atk || memberValue.isLoggedIn ? <Navigate to='/' /> : <AuthWrapper />}> */}
      {/*  <Route path='login' element={<Login />} /> */}
      {/*  <Route path='sign-up' element={<SignUp />} /> */}
      {/* </Route> */}
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Main />}>
          <Route path='' element={<Navigate to='trending' />} />
          <Route path='trending' element={<Trending />} />
          <Route path='newest' element={<Newest />} />
        </Route>
        <Route path='space'>
          <Route path=':spaceId' element={<Space />} />
          <Route path=':spaceId/setting' element={<UpdateSpace />} />
        </Route>
        <Route path='item'>
          <Route path=':itemId/setting' element={<UpdateItem />} />
        </Route>
        <Route path=':memberId' element={<MemberPage />}>
          <Route path='' element={<Navigate to='./space' />} />
          <Route path='space' element={<MemberSpace />} />
          <Route path='scrap' element={<MemberScrap />} />
        </Route>
      </Route>
      <Route path='auth' element={<AuthWrapper />}>
        <Route path='' element={<Navigate to='login' />} />
        <Route path='login' element={<Login />} />
        <Route path='sign-up' element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default App;
