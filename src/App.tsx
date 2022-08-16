import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Explore } from './pages/Explore';

import './App.css';
import { Space } from './pages/Space';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/explore' element={<Explore />} />
        <Route path='/space/:spaceId' element={<Space />} />
      </Route>
    </Routes>
  );
};

export default App;
