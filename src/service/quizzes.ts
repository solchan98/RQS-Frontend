import store from 'store';
import { baseApi } from './index';
import { reissueAtk } from './member';
import { tokenChecker } from 'util/token';

const GET_SPACE_QUIZ_LIST = '/quiz/all';
const GET_RANDOM_QUIZ = '/quiz/random';
const GET_SPACE_QUIZ = '/quiz';
const CREATE_SPACE_QUIZ = '/my/quiz';
const UPDATE_SPACE_QUIZ = '/my/quiz';
const DELETE_SPACE_QUIZ = '/my/quiz';
const CHECK_IS_CREATOR = '/my/quiz/isCreator';
const QUIZ_STATUS = '/quiz/progress';

const getQuizApi = (quizId: number) => {
  const atk = store.get('atk');
  return tokenChecker(atk).then(() => {
    const checkedAtk = store.get('atk');
    const headers = checkedAtk && { Authorization: `bearer ${checkedAtk}` };
    return baseApi
      .get(`${GET_SPACE_QUIZ}/${quizId}`, {
        headers,
      })
      .then((res) => res.data);
  });
};

export const getQuiz = (quizId: number) => {
  return getQuizApi(quizId)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => getQuizApi(quizId)));
};

const getQuizzesApi = (spaceId: number, lastQuizId?: number) => {
  const atk = store.get('atk');
  return tokenChecker(atk).then(() => {
    const checkedAtk = store.get('atk');
    const params = lastQuizId ? { spaceId, lastQuizId } : { spaceId };
    const headers = checkedAtk && { Authorization: `bearer ${checkedAtk}` };
    return baseApi
      .get(GET_SPACE_QUIZ_LIST, {
        params,
        headers,
      })
      .then((res) => res.data);
  });
};

export const getQuizzes = (spaceId: number, lastQuizId?: number) => {
  return getQuizzesApi(spaceId, lastQuizId && lastQuizId)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => getQuizzesApi(spaceId, lastQuizId)));
};

const createQuizApi = (spaceId: number, question: string, answer: string, hintList: string[]) => {
  const atk = store.get('atk');
  const hint = hintList.join(',');
  const data = { spaceId, question, answer, hint };
  return baseApi
    .post(CREATE_SPACE_QUIZ, data, {
      headers: { Authorization: `bearer ${atk}` },
    })
    .then((res) => res.data);
};

export const createQuiz = (spaceId: number, question: string, answer: string, hintList: string[]) => {
  return createQuizApi(spaceId, question, answer, hintList)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => createQuizApi(spaceId, question, answer, hintList)));
};

const getRandomQuizApi = (spaceId: number) => {
  const atk = store.get('atk');
  return tokenChecker(atk).then(() => {
    const checkedAtk = store.get('atk');
    const headers = checkedAtk && { Authorization: `bearer ${checkedAtk}` };
    return baseApi
      .get(`${GET_RANDOM_QUIZ}/${spaceId}`, {
        headers,
      })
      .then((res) => res.data);
  });
};

export const getRandomQuiz = (spaceId: number) => {
  return getRandomQuizApi(spaceId)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => getRandomQuizApi(spaceId)));
};

const updateQuizApi = (quizId: number, question: string, answer: string, hint: string) => {
  const atk = store.get('atk');
  const data = { quizId, question, answer, hint };
  return baseApi
    .put(`${UPDATE_SPACE_QUIZ}/${quizId}`, data, {
      headers: { Authorization: `bearer ${atk}` },
    })
    .then((res) => res.data);
};

export const updateQuiz = (quizId: number, question: string, answer: string, hint: string) => {
  return updateQuizApi(quizId, question, answer, hint)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => updateQuizApi(quizId, question, answer, hint)));
};

const deleteQuizApi = (quizId: number) => {
  const atk = store.get('atk');
  return baseApi
    .delete(`${DELETE_SPACE_QUIZ}/${quizId}`, {
      headers: { Authorization: `bearer ${atk}` },
    })
    .then((res) => res.data);
};

export const deleteQuiz = (quizId: number) => {
  return deleteQuizApi(quizId)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => deleteQuizApi(quizId)));
};

const checkIsQuizCreatorApi = (quizId: number) => {
  const atk = store.get('atk');
  return baseApi
    .get(`${CHECK_IS_CREATOR}/${quizId}`, {
      headers: { Authorization: `bearer ${atk}` },
    })
    .then((res) => res.data);
};

export const checkIsQuizCreator = (quizId: number) => {
  return checkIsQuizCreatorApi(quizId)
    .then((res) => res)
    .catch(() => reissueAtk().then(() => checkIsQuizCreatorApi(quizId)));
};

const getQuizStatusApi = (spaceId: number) => {
  const atk = store.get('atk');
  return baseApi
    .get(`${QUIZ_STATUS}/${spaceId}`, {
      headers: { Authorization: `bearer ${atk}` },
    })
    .then((res) => res.data);
};

export const getQuizStatus = (spaceId: number) => {
  return getQuizStatusApi(spaceId)
    .then((res) => res)
    .catch(() => reissueAtk().then(() => getQuizStatusApi(spaceId)));
};
