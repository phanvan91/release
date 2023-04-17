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

  RESET_ENVIRONMENT,
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
    case GET_ENVIRONMENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        // list: [],
        getListFailed: null,
        deleteSuccess: null,
        deleteFailed: null,
      }
    case GET_ENVIRONMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: payload.data,
        listParams: payload,
      }
    case GET_ENVIRONMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        getListFailed: null,
      }

    case GET_ENVIRONMENT_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        item: null,
        getItemFailed: null,
      }
    case GET_ENVIRONMENT_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        item: payload,
      }
    case GET_ENVIRONMENT_DETAIL_FAILED:
      return {
        ...state,
        isLoading: false,
        getItemFailed: null,
      }

    case CREATE_ENVIRONMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        getItemFailed: null,
      }
    case CREATE_ENVIRONMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        createSuccess: payload,
      }
    case CREATE_ENVIRONMENT_FAILED:
      return {
        ...state,
        isLoading: false,
        createFailed: payload,
      }

    case UPDATE_ENVIRONMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        getItemFailed: null,
      }
    case UPDATE_ENVIRONMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updateSuccess: payload,
      }
    case UPDATE_ENVIRONMENT_FAILED:
      return {
        ...state,
        isLoading: false,
        updateFailed: payload,
      }

    case DELETE_ENVIRONMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        getItemFailed: null,
      }
    case DELETE_ENVIRONMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteSuccess: payload,
      }
    case DELETE_ENVIRONMENT_FAILED:
      return {
        ...state,
        isLoading: false,
        deleteFailed: payload,
      }

    case RESET_ENVIRONMENT:
      return initState

    default:
      return state;
  }
};
