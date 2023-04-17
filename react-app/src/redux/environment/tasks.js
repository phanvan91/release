import { put, call, takeLatest } from 'redux-saga/effects';
import Api from '../../api';

import {
  GET_ENVIRONMENTS_REQUEST,
  GET_ENVIRONMENTS_SUCCESS,
  GET_ENVIRONMENTS_FAILED,

  GET_ENVIRONMENT_DETAIL_REQUEST,
  GET_ENVIRONMENT_DETAIL_SUCCESS,
  GET_ENVIRONMENT_DETAIL_FAILED,

  CREATE_ENVIRONMENT_REQUEST,
  CREATE_ENVIRONMENT_SUCCESS,
  CREATE_ENVIRONMENT_FAILED,

  UPDATE_ENVIRONMENT_REQUEST,
  UPDATE_ENVIRONMENT_SUCCESS,
  UPDATE_ENVIRONMENT_FAILED,

  DELETE_ENVIRONMENT_REQUEST,
  DELETE_ENVIRONMENT_SUCCESS,
  DELETE_ENVIRONMENT_FAILED,
} from '../../constants/actionTypes';

function* getEnvironmentSaga({ payload: query }) {
  try {
    const data = yield call(Api.environment.getAll, query);
    yield put({
      type: GET_ENVIRONMENTS_SUCCESS,
      payload: data?.data ? data : {data}
    });
  } catch (error) {
    yield put({
      type: GET_ENVIRONMENTS_FAILED,
      payload: error.message
    });
  }
}

function* getEnvironmentDetailSaga({ payload: query }) {
  try {
    const { data } = yield call(Api.environment.getDetail, query);
    yield put({
      type: GET_ENVIRONMENT_DETAIL_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: GET_ENVIRONMENT_DETAIL_FAILED,
      payload: error.message
    });
  }
}

function* createEnvironmentSaga({ payload }) {
  try {
    const data = yield call(Api.environment.create, payload);
    yield put({
      type: CREATE_ENVIRONMENT_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: CREATE_ENVIRONMENT_FAILED,
      payload: error.response.data
    });
  }
}

function* updateEnvironmentSaga({ payload }) {
  try {
    const data = yield call(Api.environment.update, payload);
    yield put({
      type: UPDATE_ENVIRONMENT_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: UPDATE_ENVIRONMENT_FAILED,
      payload: error.response.data
    });
  }
}

function* deleteEnvironmentSaga({ payload }) {
  try {
    const data = yield call(Api.environment.delete, payload);
    yield put({
      type: DELETE_ENVIRONMENT_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: DELETE_ENVIRONMENT_FAILED,
      payload: error.response.data
    });
  }
}

export default function* environmentSaga() {
  yield takeLatest(GET_ENVIRONMENTS_REQUEST, getEnvironmentSaga);
  yield takeLatest(CREATE_ENVIRONMENT_REQUEST, createEnvironmentSaga);
  yield takeLatest(UPDATE_ENVIRONMENT_REQUEST, updateEnvironmentSaga);
  yield takeLatest(GET_ENVIRONMENT_DETAIL_REQUEST, getEnvironmentDetailSaga);
  yield takeLatest(DELETE_ENVIRONMENT_REQUEST, deleteEnvironmentSaga);
}
