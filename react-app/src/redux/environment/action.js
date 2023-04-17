import {
  GET_ENVIRONMENTS_REQUEST,
  CREATE_ENVIRONMENT_REQUEST,
  RESET_ENVIRONMENT,
  GET_ENVIRONMENT_DETAIL_REQUEST,
  UPDATE_ENVIRONMENT_REQUEST,
  DELETE_ENVIRONMENT_REQUEST,
} from '../../constants/actionTypes';

export const getEnvironments = query => ({
  type: GET_ENVIRONMENTS_REQUEST,
  payload: query
});

export const createEnvironmentRequest = param => ({
  type: CREATE_ENVIRONMENT_REQUEST,
  payload: param
});

export const resetEnvironmentState = () => ({
  type: RESET_ENVIRONMENT,
});

export const getEnvironmentDetailRequest = (param) => ({
  type: GET_ENVIRONMENT_DETAIL_REQUEST,
  payload: param
});

export const updateEnvironmentRequest = (param) => ({
  type: UPDATE_ENVIRONMENT_REQUEST,
  payload: param
});

export const deleteEnviromentRequest = (param) => ({
  type: DELETE_ENVIRONMENT_REQUEST,
  payload: param
});
