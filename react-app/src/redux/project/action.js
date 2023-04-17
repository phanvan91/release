import {
  GET_PROJECTS_REQUEST,
  CREATE_PROJECT_REQUEST,
  RESET_PROJECT,
  GET_PROJECT_DETAIL_REQUEST,
  UPDATE_PROJECT_REQUEST,
  DELETE_PROJECT_REQUEST,
} from '../../constants/actionTypes';

export const getProjects = query => ({
  type: GET_PROJECTS_REQUEST,
  payload: query
});

export const createProjectRequest = param => ({
  type: CREATE_PROJECT_REQUEST,
  payload: param
});

export const resetProjectState = () => ({
  type: RESET_PROJECT,
});

export const getProjectDetailRequest = (param) => ({
  type: GET_PROJECT_DETAIL_REQUEST,
  payload: param
});

export const updateProjectRequest = (param) => ({
  type: UPDATE_PROJECT_REQUEST,
  payload: param
});

export const deleteProjectRequest = (param) => ({
  type: DELETE_PROJECT_REQUEST,
  payload: param
});
