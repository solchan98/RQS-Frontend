import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './page/home';
import { NavContainer } from './components/Layout/NavContainer/NavContainer';
import { MyQuizzes } from './page/myquizzes';
import { QuizGame } from './page/game';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<NavContainer />}>
          <Route path='' element={<Home />} />
          <Route path='settings' element={<MyQuizzes />} />
        </Route>
        <Route path='game'>
          <Route path=':quizGameId' element={<QuizGame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
