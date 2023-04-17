import { put, call, takeLatest } from 'redux-saga/effects';
import Api from '../../api';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,

  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,

  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,

  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,

  LOGOUT_REQUEST,
} from '../../constants/actionTypes';

function* login({ payload }) {
  try {
    const { data: {user, token} } = yield call(Api.user.login, payload);
    localStorage.setItem('token', token)
    yield put({ type: LOGIN_SUCCESS, payload: { token, user } });
  } catch (error) {
    yield put({ type: LOGIN_FAILED, payload: error.response.data });
  }
}

function* register({ payload: user }) {
  try {
    const res = yield call(Api.user.register, user);
    yield put({ type: REGISTER_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: REGISTER_FAILED, payload: error.response.data });
  }
}

function* getProfile() {
  try {
    const {data: user} = yield call(Api.user.profile);
    yield put({ type: GET_PROFILE_SUCCESS, payload: user });
  } catch (error) {
    yield put({ type: LOGOUT_REQUEST, payload: null });
  }
}

function* changePassword({ payload }) {
  try {
    const res = yield call(Api.user.changePassword, payload);
    yield put({ type: CHANGE_PASSWORD_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: CHANGE_PASSWORD_FAILED, payload: error.response.data });
  }
}

export default function* userSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(REGISTER_REQUEST, register);
  yield takeLatest(GET_PROFILE_REQUEST, getProfile);
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword);
}
