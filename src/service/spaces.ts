import store from 'store';
import { baseApi } from './index';
import { ISpace } from 'types/space';
import { reissueAtk } from './member';

const CREATE_NEW_SPACE = '/space';
const GET_ASIDE_MY_SPACE_LIST = '/space/all';
const UPDATE_SPACE_TITLE = '/space';
const UPDATE_SPACE_MEMBER_ROLE = '/space/spaceMember/role';

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

export const getAsideMySpaceList = (email: string, lastSpace?: ISpace) => {
  return getAsideMySpaceListApi(email, lastSpace && lastSpace)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => getAsideMySpaceListApi(email, lastSpace)));
};

const createSpaceApi = (title: string, visibility: boolean) => {
  const atk = store.get('atk');
  const data = { title, visibility };
  return baseApi
    .post(CREATE_NEW_SPACE, data, {
      headers: {
        Authorization: `bearer ${atk}`,
      },
    })
    .then((res) => res.data);
};

export const createSpace = (title: string, visibility: boolean) => {
  return createSpaceApi(title, visibility)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => createSpaceApi(title, visibility)));
};

const updateSpaceTitleApi = (spaceId: number, title: string) => {
  const atk = store.get('atk');
  const data = { spaceId, title };
  return baseApi
    .patch(UPDATE_SPACE_TITLE, data, {
      headers: {
        Authorization: `bearer ${atk}`,
      },
    })
    .then((res) => res.data);
};

export const updateSpaceTitle = (spaceId: number, title: string) => {
  return updateSpaceTitleApi(spaceId, title)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => updateSpaceTitleApi(spaceId, title)));
};

const changeSpaceMemberRoleApi = (spaceId: number, spaceMemberId: number, role: string) => {
  const atk = store.get('atk');
  const params = { spaceId, spaceMemberId, role };
  return baseApi
    .patch(UPDATE_SPACE_MEMBER_ROLE, null, {
      params,
      headers: {
        Authorization: `bearer ${atk}`,
      },
    })
    .then((res) => res.data);
};

export const changeSpaceMemberRole = (spaceId: number, spaceMemberId: number, role: string) => {
  return changeSpaceMemberRoleApi(spaceId, spaceMemberId, role)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => changeSpaceMemberRoleApi(spaceId, spaceMemberId, role)));
};
