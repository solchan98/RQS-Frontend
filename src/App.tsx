import { useSetRecoilState } from 'recoil';
import React from 'react';
import store from 'store';
import { Navigate, Route, Routes } from 'react-router-dom';

import { memberState } from './recoil/atoms/member';
import { Login } from './components/Login';

import AuthWrapper from './pages/AuthWapper';
import { useMount } from 'react-use';
import { IMemberResponse } from 'types/member';
import { Main } from './pages/Main';

const App = () => {
  const atk = store.get('atk');
  const setMember = useSetRecoilState(memberState);

  const loadMemberInfoSuccessHandler = (data: IMemberResponse) => {
    const { memberId, email, nickname, avatar } = data;
    setMember((prev) => ({
      ...prev,
      memberId,
      email,
      nickname,
      avatar: avatar ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      isLoggedIn: true,
    }));
  };

  useMount(() => {
    // TODO: atk parse
    const parsedAtk = { memberId: 1, email: 'sol@sol.com', nickname: 'sol' } as IMemberResponse;
    loadMemberInfoSuccessHandler(parsedAtk);
  });

  return (
    <Routes>
      <Route path='' element={atk ? <Main /> : <Navigate to='auth/login' />} />
      <Route path='auth' element={<AuthWrapper />}>
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
    // <Routes>
    //   <Route path='' element={isLoggedIn ? <Layout /> : <Navigate to='auth/login' />}>
    //     <Route path='' element={<Main />} />
    //     <Route path='explore' element={<Explore />} />
    //     <Route path='space/:spaceId' element={<Space />} />
    //     <Route path='space/:spaceId/setting' element={<UpdateSpace />} />
    //     <Route path='space/:spaceId/item/:itemId/setting' element={<UpdateItem />} />
    //   </Route>
    //   <Route path='auth' element={!isLoggedIn ? <AuthWrapper /> : <Navigate to='/' />}>
    //     <Route path='login' element={<Login />} />
    //   </Route>
    // </Routes>
  );
};

export default App;
