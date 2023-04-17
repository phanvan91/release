import {
  GET_USERS_REQUEST,
  RESET_USER,
  GET_USER_DETAIL_REQUEST,
  UPDATE_USER_REQUEST,
  DELETE_USER_REQUEST,
} from '../../constants/actionTypes';

export const getUsers = query => ({
  type: GET_USERS_REQUEST,
  payload: query
});

export const resetUserState = () => ({
  type: RESET_USER,
});

export const getUserDetailRequest = (param) => ({
  type: GET_USER_DETAIL_REQUEST,
  payload: param
});

export const updateUserRequest = (param) => ({
  type: UPDATE_USER_REQUEST,
  payload: param
});

export const deleteUserRequest = (param) => ({
  type: DELETE_USER_REQUEST,
  payload: param
});
