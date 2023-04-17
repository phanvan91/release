import {
  GET_ROLES_REQUEST,
} from '../../constants/actionTypes';

export const getRoles = query => ({
  type: GET_ROLES_REQUEST,
  payload: query
});
