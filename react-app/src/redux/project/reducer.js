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

  RESET_PROJECT,
} from '../../constants/actionTypes';

const initState = {
  isLoading: false,
  getListFailed: null,
  list: [],
  listParams: {},

  item: null,
  getItemFailed: null,

  createSuccess: null,
  createFailed: null,

  updateSuccess: null,
  updateFailed: null,

  deleteSuccess: null,
  deleteFailed: null,
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case GET_PROJECTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        // list: [],
        getListFailed: null,
        deleteSuccess: null,
        deleteFailed: null,
      }

    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: payload.data,
        listParams: payload,
      }

    case GET_PROJECTS_FAILED:
      return {
        ...state,
        isLoading: false,
        getListFailed: null,
      }

    case GET_PROJECT_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        item: null,
        getItemFailed: null,
      }
    case GET_PROJECT_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        item: payload,
      }
    case GET_PROJECT_DETAIL_FAILED:
      return {
        ...state,
        isLoading: false,
        getItemFailed: null,
      }

    case CREATE_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
        getItemFailed: null,
      }
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        createSuccess: payload,
      }
    case CREATE_PROJECT_FAILED:
      return {
        ...state,
        isLoading: false,
        createFailed: payload,
      }

    case UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
        getItemFailed: null,
      }
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updateSuccess: payload,
      }
    case UPDATE_PROJECT_FAILED:
      return {
        ...state,
        isLoading: false,
        updateFailed: payload,
      }

    case DELETE_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
        deleteFailed: null,
      }
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteSuccess: payload,
      }
    case DELETE_PROJECT_FAILED:
      return {
        ...state,
        isLoading: false,
        deleteFailed: payload,
      }

    case RESET_PROJECT:
      return initState

    default:
      return state;
  }
};
