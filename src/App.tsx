import { useRecoilValue, useSetRecoilState } from 'recoil';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { memberState } from './recoil/atoms/member';
import { Layout } from './components/Layout';
import { Explore } from './pages/Explore';
import { Space } from './pages/Space';
import { Login } from './components/Login';

import './App.css';
import AuthWrapper from './pages/AuthWapper';
import { useMount } from 'react-use';
import { getMemberInfo } from './service/member';
import store from 'store';

const App = () => {
  const { isLoggedIn } = useRecoilValue(memberState);
  const setMember = useSetRecoilState(memberState);

  useMount(() => {
    const atk = store.get('atk');
    setMember((prev) => ({ ...prev, isLoading: true }));
    if (!isLoggedIn && atk) {
      getMemberInfo(atk)
        .then((res) => {
          const { memberId, email, nickname, avatar } = res.data;
          setMember((prev) => ({
            ...prev,
            memberId,
            email,
            nickname,
            avatar: avatar ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            isLoggedIn: true,
          }));
        })
        .catch((error) => {
          store.remove('atk');
          console.log(error.response);
        });
    }
  });

  return (
    <Routes>
      <Route path='' element={isLoggedIn ? <Layout /> : <Navigate to='auth/login' />}>
        <Route path='explore' element={<Explore />} />
        <Route path='space/:spaceId' element={<Space />} />
      </Route>
      <Route path='auth' element={!isLoggedIn ? <AuthWrapper /> : <Navigate to='/' />}>
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
