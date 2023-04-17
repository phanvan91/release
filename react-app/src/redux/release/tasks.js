import { put, call, takeLatest } from 'redux-saga/effects';
import Api from '../../api';

import {
  GET_RELEASES_REQUEST,
  GET_RELEASES_SUCCESS,
  GET_RELEASES_FAILED,

  GET_RELEASE_DETAIL_REQUEST,
  GET_RELEASE_DETAIL_SUCCESS,
  GET_RELEASE_DETAIL_FAILED,

  CREATE_RELEASE_REQUEST,
  CREATE_RELEASE_SUCCESS,
  CREATE_RELEASE_FAILED,

  DELETE_RELEASE_REQUEST,
  DELETE_RELEASE_SUCCESS,
  DELETE_RELEASE_FAILED,
} from '../../constants/actionTypes';

function* getReleaseSaga({ payload: query }) {
  try {
    const data = yield call(Api.release.getAll, query);
    yield put({
      type: GET_RELEASES_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: GET_RELEASES_FAILED,
      payload: error.message
    });
  }
}

function* getReleaseDetailSaga({ payload: query }) {
  try {
    const { data } = yield call(Api.release.getDetail, query);
    yield put({
      type: GET_RELEASE_DETAIL_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: GET_RELEASE_DETAIL_FAILED,
      payload: error.message
    });
  }
}

function* createReleaseSaga({ payload }) {
  try {
    const data = yield call(Api.release.create, payload);
    yield put({
      type: CREATE_RELEASE_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: CREATE_RELEASE_FAILED,
      payload: error.response.data
    });
  }
}

function* deleteReleaseSaga({ payload }) {
  try {
    const data = yield call(Api.release.delete, payload);
    yield put({
      type: DELETE_RELEASE_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: DELETE_RELEASE_FAILED,
      payload: error.response.data
    });
  }
}

export default function* project() {
  yield takeLatest(GET_RELEASES_REQUEST, getReleaseSaga);
  yield takeLatest(CREATE_RELEASE_REQUEST, createReleaseSaga);
  yield takeLatest(GET_RELEASE_DETAIL_REQUEST, getReleaseDetailSaga);
  yield takeLatest(DELETE_RELEASE_REQUEST, deleteReleaseSaga);
}
