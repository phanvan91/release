import { combineReducers } from 'redux';
import user from './user/reducer';
import auth from './auth/reducer';
import release from './release/reducer';
import project from './project/reducer';
import siteSetting from './siteSetting/reducer';
import environment from './environment/reducer';
import role from './role/reducer';

const rootReducer = combineReducers({
  siteSetting,
  auth,
  user,
  role,
  release,
  project,
  environment,
});

export default rootReducer;
