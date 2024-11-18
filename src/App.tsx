import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './page/home';
import { NavContainer } from './components/Layout/NavContainer/NavContainer';
import { MyQuizzes } from './page/myquizzes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<NavContainer />}>
          <Route path="" element={<Home />} />
          <Route path="my-quizzes" element={<MyQuizzes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
