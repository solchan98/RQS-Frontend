import store from 'store';
import { baseApi } from './index';
import { ISpace } from 'types/space';
import { reissueAtk } from './member';
import { tokenChecker } from '../util/token';

const CREATE_NEW_SPACE = '/my/space';
const JOIN_SPACE = '/my/space/join';
const CHECK_JOIN_SPACE = '/space/join';

const GET_SPACE = '/space';
const GET_SPACE_LIST = '/space/all';
const GET_MEMBER_SPACE_LIST = (targetMemberId: number) => `/space/${targetMemberId}/all`;

const GET_MY_SPACE_LIST = '/my/space/all';
const GET_SPACE_MEMBER_LIST = '/my/space/spaceMemberList';
const UPDATE_SPACE_TITLE = '/my/space';
const UPDATE_SPACE_MEMBER_ROLE = '/my/space/spaceMember/role';
const UPDATE_SPACE_VISIBILITY = '/my/space/visibility';
const DELETE_SPACE = '/my/space';
const CHECK_IS_CREATOR = '/my/space/updatable';

const getSpaceApi = (spaceId: number) => {
  const atk = store.get('atk');
  return tokenChecker(atk).then(() => {
    const checkedAtk = store.get('atk');
    const headers = checkedAtk && { Authorization: `bearer ${checkedAtk}` };
    return baseApi
      .get(GET_SPACE, {
        params: { spaceId },
        headers,
      })
      .then((res) => res.data);
  });
};

export const getSpace = (spaceId: number) => {
  return getSpaceApi(spaceId)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => getSpaceApi(spaceId)));
};

const getTrendingSpaceListApi = (offset: number) => {
  const params = offset && { offset };
  return baseApi
    .get(`${GET_SPACE_LIST}/trending`, {
      params,
    })
    .then((res) => res.data);
};

export const getTrendingSpaceList = (offset: number) => {
  return getTrendingSpaceListApi(offset)
    .then((data) => data)
    .catch(() => alert('SERVER ERROR!'));
};

const getNewestSpaceListApi = (lastCreatedAt: string) => {
  const params = lastCreatedAt && { lastCreatedAt };
  return baseApi.get(GET_SPACE_LIST, { params }).then((res) => res.data);
};

export const getNewestSpaceList = (lastCreatedAt: string) => {
  return getNewestSpaceListApi(lastCreatedAt)
    .then((data) => data)
    .catch(() => alert('SERVER ERROR!'));
};

const getMemberSpaceListApi = (targetMemberId: number, lastJoinedAt: string) => {
  const params = lastJoinedAt && { lastJoinedAt };
  const atk = store.get('atk');
  const headers = atk && { Authorization: `bearer ${atk}` };
  return baseApi.get(GET_MEMBER_SPACE_LIST(targetMemberId), { params, headers }).then((res) => res.data);
};

export const getMemberSpaceList = (targetMemberId: number, lastJoinedAt: string) => {
  return getMemberSpaceListApi(targetMemberId, lastJoinedAt)
    .then((data) => data)
    .catch(() => alert('SERVER ERROR!'));
};

const getMySpaceListApi = (email: string, lastSpace?: ISpace) => {
  const atk = store.get('atk');
  let params;
  if (lastSpace) {
    params = { lastJoinedAt: lastSpace.memberJoinedAt };
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

const getSpaceMemberListApi = (spaceId: number) => {
  const atk = store.get('atk');
  const params = { spaceId };
  return baseApi
    .get(GET_SPACE_MEMBER_LIST, { params, headers: { Authorization: `bearer ${atk}` } })
    .then((res) => res.data);
};

export const getSpaceMemberList = (spaceId: number) => {
  return getSpaceMemberListApi(spaceId)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => getSpaceMemberListApi(spaceId)));
};

const createSpaceApi = (title: string, content: string, visibility: boolean) => {
  const atk = store.get('atk');
  const data = { title, content, visibility };
  return baseApi
    .post(CREATE_NEW_SPACE, data, {
      headers: { Authorization: `bearer ${atk}` },
    })
    .then((res) => res.data);
};

export const createSpace = (title: string, content: string, visibility: boolean) => {
  return createSpaceApi(title, content, visibility)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => createSpaceApi(title, content, visibility)));
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

const checkJoinSpaceApi = (spaceId: string, code: string) => {
  const params = { spaceId, code };
  return baseApi.get(CHECK_JOIN_SPACE, { params }).then((res) => res.data);
};

export const checkJoinSpace = (spaceId: string, code: string) => {
  return checkJoinSpaceApi(spaceId, code).then((data) => data);
};

const getSpaceJoinCodesApi = (spaceId: number) => {
  const atk = store.get('atk');
  const params = { spaceId };
  const headers = { Authorization: `bearer ${atk}` };
  return baseApi.get(JOIN_SPACE, { params, headers }).then((res) => res.data);
};

export const getSpaceJoinCodes = (spaceId: number) => {
  return getSpaceJoinCodesApi(spaceId)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => getSpaceJoinCodesApi(spaceId)));
};

const joinSpaceWithCodeApi = (spaceId: number, code: string) => {
  const atk = store.get('atk');
  const params = { spaceId, code };
  const headers = { Authorization: `bearer ${atk}` };
  return baseApi.post(JOIN_SPACE, {}, { params, headers }).then((res) => res.data);
};

export const joinSpaceWithCode = (spaceId: number, code: string) => {
  return joinSpaceWithCodeApi(spaceId, code)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => joinSpaceWithCodeApi(spaceId, code)));
};

const checkIsSpaceCreatorApi = (spaceId: number) => {
  const atk = store.get('atk');
  const params = { spaceId };
  const headers = { Authorization: `bearer ${atk}` };
  return baseApi
    .get(CHECK_IS_CREATOR, {
      params,
      headers,
    })
    .then((res) => res.data);
};

export const checkIsSpaceCreator = (spaceId: number) => {
  return checkIsSpaceCreatorApi(spaceId)
    .then((res) => res)
    .catch(() => reissueAtk().then(() => checkIsSpaceCreatorApi(spaceId)));
};

const changeVisibilityApi = (spaceId: number, open: boolean) => {
  const atk = store.get('atk');
  const params = { spaceId, open };
  const headers = { Authorization: `bearer ${atk}` };

  return baseApi.patch(UPDATE_SPACE_VISIBILITY, {}, { params, headers }).then((res) => res.data);
};

export const changeVisibility = (spaceId: number, open: boolean) => {
  return changeVisibilityApi(spaceId, open)
    .then((data) => data)
    .catch(() => reissueAtk().then(() => changeVisibilityApi(spaceId, open)));
};
