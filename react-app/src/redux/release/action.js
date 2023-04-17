import {
  GET_RELEASES_REQUEST,
  CREATE_RELEASE_REQUEST,
  GET_RELEASE_DETAIL_REQUEST,
  DELETE_RELEASE_REQUEST,

  RESET_RELEASE,
} from '../../constants/actionTypes';

export const getReleases = query => ({
  type: GET_RELEASES_REQUEST,
  payload: query
});

export const createReleaseRequest = param => ({
  type: CREATE_RELEASE_REQUEST,
  payload: param
});

export const resetReleaseState = () => ({
  type: RESET_RELEASE,
});

export const getReleaseDetail = param => ({
  type: GET_RELEASE_DETAIL_REQUEST,
  payload: param
});

export const deleteReleaseRequest = (param) => ({
  type: DELETE_RELEASE_REQUEST,
  payload: param
});
