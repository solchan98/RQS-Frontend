import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './page/home';
import { NavContainer } from './components/Layout/NavContainer/NavContainer';
import { MyQuizzes } from './page/myquizzes';
import { PlayQuizGame } from './page/game/Play';
import { EasyQuizCreate } from './page/quizcreate/EasyQuizCreate';
import { QuizCreateIntro } from './page/quizcreate';
import { PrepareQuizGame } from './page/game/Prepare';
import { ResultsQuizGame } from './page/game/Results';
import { Login } from './page/auth/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<NavContainer />}>
          <Route path='' element={<Home />} />
          <Route path='settings' element={<MyQuizzes />} />
        </Route>
        <Route path='auth'>
          <Route path='login' element={<Login />} />
        </Route>
        <Route path='game'>
          <Route path='' element={<Navigate to='../' />} />
          <Route path=':quizPackId'>
            <Route path='' element={<Navigate to='prepare' />} />
            <Route path='prepare' element={<PrepareQuizGame />} />
            <Route path='play'>
              <Route path='' element={<Navigate to='../' />} />
              <Route path=':quizGameId' element={<PlayQuizGame />} />
            </Route>
            <Route path='results'>
              <Route path='' element={<Navigate to='../' />} />
              <Route path=':quizGameId' element={<ResultsQuizGame />} />
            </Route>
          </Route>
        </Route>
        <Route path='new-quizzes'>
          <Route path='' element={<QuizCreateIntro />} />
          <Route path='easy' element={<EasyQuizCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
