import { put, call, takeLatest } from 'redux-saga/effects';
import Api from '../../api';

import {
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILED,

  GET_PROJECT_DETAIL_REQUEST,
  GET_PROJECT_DETAIL_SUCCESS,
  GET_PROJECT_DETAIL_FAILED,

  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILED,

  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILED,

  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILED,
} from '../../constants/actionTypes';

function* getProjectsSaga({ payload: query }) {
  try {
    const data = yield call(Api.project.getAll, query);
    yield put({
      type: GET_PROJECTS_SUCCESS,
      payload: data?.data ? data : {data}
    });
  } catch (error) {
    yield put({
      type: GET_PROJECTS_FAILED,
      payload: error.message
    });
  }
}

function* getProjectDetailSaga({ payload: query }) {
  try {
    const { data } = yield call(Api.project.getDetail, query);
    yield put({
      type: GET_PROJECT_DETAIL_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: GET_PROJECT_DETAIL_FAILED,
      payload: error.message
    });
  }
}

function* createProjectSaga({ payload }) {
  try {
    const data = yield call(Api.project.create, payload);
    yield put({
      type: CREATE_PROJECT_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: CREATE_PROJECT_FAILED,
      payload: error.response.data
    });
  }
}

function* updateProjectSaga({ payload }) {
  try {
    const data = yield call(Api.project.update, payload);
    yield put({
      type: UPDATE_PROJECT_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: UPDATE_PROJECT_FAILED,
      payload: error.response.data
    });
  }
}

function* deleteProjectSaga({ payload }) {
  try {
    const data = yield call(Api.project.delete, payload);
    yield put({
      type: DELETE_PROJECT_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: DELETE_PROJECT_FAILED,
      payload: error.response.data
    });
  }
}

export default function* project() {
  yield takeLatest(GET_PROJECTS_REQUEST, getProjectsSaga);
  yield takeLatest(CREATE_PROJECT_REQUEST, createProjectSaga);
  yield takeLatest(UPDATE_PROJECT_REQUEST, updateProjectSaga);
  yield takeLatest(GET_PROJECT_DETAIL_REQUEST, getProjectDetailSaga);
  yield takeLatest(DELETE_PROJECT_REQUEST, deleteProjectSaga);
}
