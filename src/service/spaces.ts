import store from 'store';
import { baseApi } from './index';
import { ISpace } from 'types/space';
import { reissueAtk } from './member';

const CREATE_NEW_SPACE = '/space';
const GET_SPACE = '/space';
const GET_MY_SPACE_LIST = '/space/all';
const UPDATE_SPACE_TITLE = '/space';
const UPDATE_SPACE_MEMBER_ROLE = '/space/spaceMember/role';
const DELETE_SPACE = '/space';

const getSpaceApi = (spaceId: number) => {
  const atk = store.get('atk');
  return baseApi
    .get(GET_SPACE, {
      params: { spaceId },
      headers: { Authorization: `bearer ${atk}` },
    })
    .then((res) => res.data);
};

export const getSpace = (spaceId: number) => {
  return getSpaceApi(spaceId)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => getSpaceApi(spaceId)));
};

const getMySpaceListApi = (email: string, lastSpace?: ISpace) => {
  const atk = store.get('atk');
  let params;
  if (lastSpace) {
    params = { lastJoinedAt: lastSpace.joinedAt };
  }
  return baseApi
    .get(GET_MY_SPACE_LIST, {
      params,
      headers: { Authorization: `bearer ${atk}` },
    })
    .then((res) => res.data);
};

export const getMySpaceList = (email: string, lastSpace?: ISpace) => {
  return getMySpaceListApi(email, lastSpace && lastSpace)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => getMySpaceListApi(email, lastSpace)));
};

const createSpaceApi = (title: string, visibility: boolean) => {
  const atk = store.get('atk');
  const data = { title, visibility };
  return baseApi
    .post(CREATE_NEW_SPACE, data, {
      headers: { Authorization: `bearer ${atk}` },
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
      headers: { Authorization: `bearer ${atk}` },
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
      headers: { Authorization: `bearer ${atk}` },
    })
    .then((res) => res.data);
};

export const changeSpaceMemberRole = (spaceId: number, spaceMemberId: number, role: string) => {
  return changeSpaceMemberRoleApi(spaceId, spaceMemberId, role)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => changeSpaceMemberRoleApi(spaceId, spaceMemberId, role)));
};

const deleteSpaceApi = (spaceId: number) => {
  const atk = store.get('atk');
  const params = { spaceId };
  return baseApi
    .delete(DELETE_SPACE, {
      params,
      headers: { Authorization: `bearer ${atk}` },
    })
    .then((res) => res.data);
};

export const deleteSpace = (spaceId: number) => {
  return deleteSpaceApi(spaceId)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => deleteSpaceApi(spaceId)));
};
