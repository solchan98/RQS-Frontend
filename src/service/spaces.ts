import store from 'store';
import { baseApi } from './index';
import { ISpace } from 'types/space';
import { reissueAtk } from './member';

const GET_ASIDE_MY_SPACE_LIST = '/space/all';

const getAsideMySpaceListApi = (email: string, lastSpace?: ISpace) => {
  const atk = store.get('atk');
  let params;
  if (lastSpace) {
    const last = lastSpace.spaceMemberList.find((spaceMember) => spaceMember.email === email);
    params = { lastJoinedAt: last?.joinedAt };
  }
  return baseApi
    .get(GET_ASIDE_MY_SPACE_LIST, {
      params,
      headers: {
        Authorization: `bearer ${atk}`,
      },
    })
    .then((res) => res.data);
};

export const getAsideMySpaceList = (email: string, lastSpace: ISpace | undefined) => {
  return getAsideMySpaceListApi(email, lastSpace && lastSpace)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => getAsideMySpaceListApi(email, lastSpace)));
};
