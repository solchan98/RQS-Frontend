import store from 'store';
import { baseApi } from './index';
import { reissueAtk } from './member';

const GET_SPACE_ITEM_LIST = '/item';

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
