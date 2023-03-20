import store from 'store';
import { baseApi } from './index';
import { reissueAtk } from './member';
import { tokenChecker } from 'util/token';
import { ICreateAnswer } from 'types/quiz';

const GET_SPACE_QUIZ_LIST = '/quiz/all';
const GET_RANDOM_QUIZ = '/quizgame/random';
const GET_SPACE_QUIZ = '/quiz';
const CREATE_SPACE_QUIZ = '/my/quiz';
const UPDATE_SPACE_QUIZ = '/my/quiz';
const DELETE_SPACE_QUIZ = '/my/quiz';
const CHECK_IS_CREATOR = '/my/quiz/isCreator';
const QUIZ_STATUS = '/quizgame/progress';

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

const createQuizApi = (
  spaceId: number,
  question: string,
  createAnswers: ICreateAnswer[],
  type: string,
  hintList: string[]
) => {
  const atk = store.get('atk');
  const hint = hintList.join(',');
  const data = { spaceId, question, createAnswers, type, hint };
  return baseApi
    .post(CREATE_SPACE_QUIZ, data, {
      headers: { Authorization: `bearer ${atk}` },
    })
    .then((res) => res.data);
};

export const createQuiz = (
  spaceId: number,
  question: string,
  createAnswers: ICreateAnswer[],
  type: string,
  hintList: string[]
) => {
  return createQuizApi(spaceId, question, createAnswers, type, hintList)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => createQuizApi(spaceId, question, createAnswers, type, hintList)));
};

const createChildQuizApi = (
  spaceId: number,
  parentId: number,
  question: string,
  createAnswers: ICreateAnswer[],
  type: string,
  hintList: string[]
) => {
  const atk = store.get('atk');
  const hint = hintList.join(',');
  const data = { spaceId, question, createAnswers, type, hint };
  return baseApi
    .post(`${CREATE_SPACE_QUIZ}/${parentId}/child`, data, {
      headers: { Authorization: `bearer ${atk}` },
    })
    .then((res) => res.data);
};

export const createChildQuiz = (
  spaceId: number,
  parentId: number,
  question: string,
  createAnswers: ICreateAnswer[],
  type: string,
  hintList: string[]
) => {
  return createChildQuizApi(spaceId, parentId, question, createAnswers, type, hintList)
    .then((data) => data)
    .catch(() =>
      reissueAtk().then(() => createChildQuizApi(spaceId, parentId, question, createAnswers, type, hintList))
    );
};

const updateQuizApi = (quizId: number, question: string, type: string, answers: ICreateAnswer[], hint: string) => {
  const atk = store.get('atk');
  const data = { quizId, question, type, answers, hint };
  return baseApi
    .put(`${UPDATE_SPACE_QUIZ}/${quizId}`, data, {
      headers: { Authorization: `bearer ${atk}` },
    })
    .then((res) => res.data);
};

export const updateQuiz = (quizId: number, question: string, type: string, answers: ICreateAnswer[], hint: string) => {
  return updateQuizApi(quizId, question, type, answers, hint)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => updateQuizApi(quizId, question, type, answers, hint)));
};

const getRandomQuizApi = (spaceId: number, type: string) => {
  const atk = store.get('atk');
  return tokenChecker(atk).then(() => {
    const checkedAtk = store.get('atk');
    const headers = checkedAtk && { Authorization: `bearer ${checkedAtk}` };
    return baseApi
      .get(`${GET_RANDOM_QUIZ}/${spaceId}/${type}`, {
        headers,
      })
      .then((res) => res.data);
  });
};

export const getRandomQuiz = (spaceId: number, type: string) => {
  return getRandomQuizApi(spaceId, type)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => getRandomQuizApi(spaceId, type)));
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
