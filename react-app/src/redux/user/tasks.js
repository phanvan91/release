import { put, call, takeLatest } from 'redux-saga/effects';
import Api from '../../api';

import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,

  GET_USER_DETAIL_REQUEST,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_FAILED,

  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,

  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
} from '../../constants/actionTypes';

function* getUsers({ payload: query }) {
  try {
    const data = yield call(Api.user.getAll, query);
    yield put({
      type: GET_USERS_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: GET_USERS_FAILED,
      payload: error.message
    });
  }
}

function* getUserDetailSaga({ payload: query }) {
  try {
    const { data } = yield call(Api.user.getDetail, query);
    yield put({
      type: GET_USER_DETAIL_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: GET_USER_DETAIL_FAILED,
      payload: error.message
    });
  }
}

function* updateUserSaga({ payload }) {
  try {
    const data = yield call(Api.user.update, payload);
    yield put({
      type: UPDATE_USER_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: UPDATE_USER_FAILED,
      payload: error.response.data
    });
  }
}function* deleteUserSaga({ payload }) {
  try {
    const data = yield call(Api.user.delete, payload);
    yield put({
      type: DELETE_USER_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: DELETE_USER_FAILED,
      payload: error.response.data
    });
  }
}

export default function* users() {
  yield takeLatest(GET_USERS_REQUEST, getUsers);
  yield takeLatest(GET_USER_DETAIL_REQUEST, getUserDetailSaga);
  yield takeLatest(UPDATE_USER_REQUEST, updateUserSaga);
  yield takeLatest(DELETE_USER_REQUEST, deleteUserSaga);
}
