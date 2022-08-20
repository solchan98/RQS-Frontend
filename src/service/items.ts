import store from 'store';
import { baseApi } from './index';
import { reissueAtk } from './member';

const GET_SPACE_ITEM_LIST = '/item';
const GET_RAMDOM_SPACE_ITEM = '/item/random';
const CREATE_SPACE_ITEM = '/item';

const getSpaceItemApi = (spaceId: number, lastItemId?: number) => {
  const atk = store.get('atk');
  const params = lastItemId ? { spaceId, lastItemId } : { spaceId };

  return baseApi
    .get(GET_SPACE_ITEM_LIST, {
      params,
      headers: {
        Authorization: `bearer ${atk}`,
      },
    })
    .then((res) => res.data);
};

export const getSpaceItem = (spaceId: number, lastItemId?: number) => {
  return getSpaceItemApi(spaceId, lastItemId && lastItemId)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => getSpaceItemApi(spaceId, lastItemId)));
};

const createSpaceItemApi = (spaceId: number, question: string, answer: string, hintList: string[]) => {
  const atk = store.get('atk');
  const hint = hintList.join(',');
  const data = { spaceId, question, answer, hint };
  return baseApi
    .post(CREATE_SPACE_ITEM, data, {
      headers: {
        Authorization: `bearer ${atk}`,
      },
    })
    .then((res) => res.data);
};

export const createSpaceItem = (spaceId: number, question: string, answer: string, hintList: string[]) => {
  return createSpaceItemApi(spaceId, question, answer, hintList)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => createSpaceItemApi(spaceId, question, answer, hintList)));
};

const getRandomSpaceItemApi = (spaceId: number) => {
  const atk = store.get('atk');
  const params = { spaceId };
  return baseApi
    .get(GET_RAMDOM_SPACE_ITEM, {
      params,
      headers: {
        Authorization: `bearer ${atk}`,
      },
    })
    .then((res) => res.data);
};

export const getRandomSpaceItem = (spaceId: number) => {
  return getRandomSpaceItemApi(spaceId)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => getRandomSpaceItemApi(spaceId)));
};
