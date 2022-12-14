import store from 'store';
import { baseApi } from './index';
import { reissueAtk } from './member';
import { tokenChecker } from '../util/token';

const GET_SPACE_ITEM_LIST = '/item/all';
const GET_RANDOM_SPACE_ITEM = '/my/item/random';
const GET_SPACE_ITEM = '/item';
const CREATE_SPACE_ITEM = '/my/item';
const UPDATE_SPACE_ITEM = '/my/item';
const DELETE_SPACE_ITEM = '/my/item';
const CHECK_IS_CREATOR = '/my/item/creator';

const getSpaceItemApi = (itemId: number) => {
  const atk = store.get('atk');
  return tokenChecker(atk).then(() => {
    const checkedAtk = store.get('atk');
    const params = { itemId };
    const headers = checkedAtk && { Authorization: `bearer ${checkedAtk}` };
    return baseApi
      .get(GET_SPACE_ITEM, {
        params,
        headers,
      })
      .then((res) => res.data);
  });
};

export const getSpaceItem = (itemId: number) => {
  return getSpaceItemApi(itemId)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => getSpaceItemApi(itemId)));
};

const getSpaceItemListApi = (spaceId: number, lastItemId?: number) => {
  const atk = store.get('atk');
  return tokenChecker(atk).then(() => {
    const checkedAtk = store.get('atk');
    const params = lastItemId ? { spaceId, lastItemId } : { spaceId };
    const headers = checkedAtk && { Authorization: `bearer ${checkedAtk}` };
    return baseApi
      .get(GET_SPACE_ITEM_LIST, {
        params,
        headers,
      })
      .then((res) => res.data);
  });
};

export const getSpaceItemList = (spaceId: number, lastItemId?: number) => {
  return getSpaceItemListApi(spaceId, lastItemId && lastItemId)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => getSpaceItemListApi(spaceId, lastItemId)));
};

const createSpaceItemApi = (spaceId: number, question: string, answer: string, hintList: string[]) => {
  const atk = store.get('atk');
  const hint = hintList.join(',');
  const data = { spaceId, question, answer, hint };
  return baseApi
    .post(CREATE_SPACE_ITEM, data, {
      headers: { Authorization: `bearer ${atk}` },
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
  return tokenChecker(atk).then(() => {
    const checkedAtk = store.get('atk');
    const params = { spaceId };
    const headers = checkedAtk && { Authorization: `bearer ${checkedAtk}` };
    return baseApi
      .get(GET_RANDOM_SPACE_ITEM, {
        params,
        headers,
      })
      .then((res) => res.data);
  });
};

export const getRandomSpaceItem = (spaceId: number) => {
  return getRandomSpaceItemApi(spaceId)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => getRandomSpaceItemApi(spaceId)));
};

const updateSpaceItemApi = (itemId: number, question: string, answer: string, hint: string) => {
  const atk = store.get('atk');
  const data = { itemId, question, answer, hint };
  return baseApi
    .put(UPDATE_SPACE_ITEM, data, {
      headers: { Authorization: `bearer ${atk}` },
    })
    .then((res) => res.data);
};

export const updateSpaceItem = (itemId: number, question: string, answer: string, hint: string) => {
  return updateSpaceItemApi(itemId, question, answer, hint)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => updateSpaceItemApi(itemId, question, answer, hint)));
};

const deleteItemApi = (itemId: number) => {
  const atk = store.get('atk');
  const params = { itemId };
  return baseApi
    .delete(DELETE_SPACE_ITEM, {
      params,
      headers: { Authorization: `bearer ${atk}` },
    })
    .then((res) => res.data);
};

export const deleteItem = (itemId: number) => {
  return deleteItemApi(itemId)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => deleteItemApi(itemId)));
};

const checkIsItemCreatorApi = (itemId: number) => {
  const atk = store.get('atk');
  const params = { itemId };
  return baseApi
    .get(CHECK_IS_CREATOR, {
      params,
      headers: { Authorization: `bearer ${atk}` },
    })
    .then((res) => res.data);
};

export const checkIsItemCreator = (itemId: number) => {
  return checkIsItemCreatorApi(itemId)
    .then((res) => res)
    .catch(() => reissueAtk().then(() => checkIsItemCreatorApi(itemId)));
};
