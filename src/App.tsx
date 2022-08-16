import { useRecoilValue } from 'recoil';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { memberState } from './recoil/atoms/member';
import { Layout } from './components/Layout';
import { Explore } from './pages/Explore';
import { Space } from './pages/Space';
import { Login } from './components/Login';

import './App.css';
import AuthWrapper from './pages/AuthWapper';

const App = () => {
  const { isLoggedIn } = useRecoilValue(memberState);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('로그인 요청해!');
    }
  }, []);

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
