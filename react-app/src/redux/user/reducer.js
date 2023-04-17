import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,

  GET_USER_DETAIL_REQUEST,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_FAILED,

  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,

  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,

  RESET_USER,
} from '../../constants/actionTypes';

const initState = {
  isLoading: false,
  getListFailed: null,
  list: [],
  listParams: {},

  item: null,
  getItemFailed: null,

  updateSuccess: null,
  updateFailed: null,

  deleteSuccess: null,
  deleteFailed: null,
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        // list: [],
        getListFailed: null,
        deleteSuccess: null,
        deleteFailed: null,
      }

    case GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: payload.data,
        listParams: payload,
      }

    case GET_USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        getListFailed: null,
      }

    case GET_USER_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        item: null,
        getItemFailed: null,
      }
    case GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        item: payload,
      }
    case GET_USER_DETAIL_FAILED:
      return {
        ...state,
        isLoading: false,
        getItemFailed: null,
      }

    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        getItemFailed: null,
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updateSuccess: payload,
      }
    case UPDATE_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        updateFailed: payload,
      }

    case DELETE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        deleteFailed: null,
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteSuccess: payload,
      }
    case DELETE_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        deleteFailed: payload,
      }

    case RESET_USER:
      return initState

    default:
      return state;
  }
};
