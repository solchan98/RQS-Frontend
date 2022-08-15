import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/explore' element={<div>Explore</div>} />
        <Route path='/space' element={<div>Space Page</div>} />
      </Route>
    </Routes>
  );
};

export default App;
