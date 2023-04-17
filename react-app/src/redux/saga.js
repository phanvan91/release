import { all } from 'redux-saga/effects';
import user from './user/tasks';
import auth from './auth/tasks';
import release from './release/tasks';
import project from './project/tasks';
import siteSetting from './siteSetting/tasks';
import environment from './environment/tasks';
import role from './role/tasks';

export default function* rootSaga() {
  yield all([
    siteSetting(),
    user(),
    auth(),
    release(),
    project(),
    environment(),
    role(),
  ]);
}
