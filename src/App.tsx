import store from 'store';
import jwtDecode from 'jwt-decode';
import { useMount } from 'react-use';
import { useRecoilState } from 'recoil';
import { Navigate, Route, Routes } from 'react-router-dom';

import { memberState } from 'recoil/atoms/member';
import { IMemberSubject } from 'types/member';

import { Login } from 'components/Login';
import { Layout } from 'components/Layout';
import { Main } from 'pages/Main';
import AuthWrapper from 'pages/AuthWapper';
import { Space } from 'pages/Space';
import { UpdateSpace } from 'pages/UpdateSpace';
import { UpdateItem } from 'pages/UpdateItem';
import { SignUp } from './components/SignUp';

const App = () => {
  const atk = store.get('atk');
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
    if (atk) {
      const decoded: { exp: number; iat: number; sub: string } = jwtDecode(atk);
      loadMemberInfoSuccessHandler(JSON.parse(decoded.sub));
    }
  });

  return (
    <Routes>
      <Route path='' element={atk || memberValue.isLoggedIn ? <Layout /> : <Navigate to='auth/login' />}>
        <Route path='' element={<Main />} />
        <Route path='space/:spaceId' element={<Space />} />
        <Route path='space/:spaceId/setting' element={<UpdateSpace />} />
        <Route path='item/:itemId/setting' element={<UpdateItem />} />
      </Route>
      <Route path='auth' element={atk || memberValue.isLoggedIn ? <Navigate to='/' /> : <AuthWrapper />}>
        <Route path='login' element={<Login />} />
        <Route path='sign-up' element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default App;
