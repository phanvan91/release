import { put, call, takeLatest } from 'redux-saga/effects';
import Api from '../../api';

import {
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILED,
} from '../../constants/actionTypes';

function* getRoles({ payload: query }) {
  try {
    const {data} = yield call(Api.role.getAll, query);
    yield put({
      type: GET_ROLES_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: GET_ROLES_FAILED,
      payload: error.message
    });
  }
}

export default function* roles() {
  yield takeLatest(GET_ROLES_REQUEST, getRoles);
}
