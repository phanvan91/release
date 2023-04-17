import {
  GET_RELEASES_REQUEST,
  GET_RELEASES_SUCCESS,
  GET_RELEASES_FAILED,

  GET_RELEASE_DETAIL_REQUEST,
  GET_RELEASE_DETAIL_SUCCESS,
  GET_RELEASE_DETAIL_FAILED,

  CREATE_RELEASE_REQUEST,
  CREATE_RELEASE_SUCCESS,
  CREATE_RELEASE_FAILED,

  DELETE_RELEASE_REQUEST,
  DELETE_RELEASE_SUCCESS,
  DELETE_RELEASE_FAILED,

  RESET_RELEASE,
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

  deleteSuccess: null,
  deleteFailed: null,
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case GET_RELEASES_REQUEST:
      return {
        ...state,
        isLoading: true,
        // list: [],
        getListFailed: null,
        deleteSuccess: null,
        deleteFailed: null,
      }
    case GET_RELEASES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: window.innerWidth > 768 ? payload.data : (+payload.current_page > 1 ? [...state.list, ...payload.data] : payload.data),
        listParams: payload,
      }
    case GET_RELEASES_FAILED:
      return {
        ...state,
        isLoading: false,
        getListFailed: null,
      }

    case GET_RELEASE_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        item: [],
        getItemFailed: null,
      }
    case GET_RELEASE_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        item: payload,
      }
    case GET_RELEASE_DETAIL_FAILED:
      return {
        ...state,
        isLoading: false,
        getItemFailed: payload,
      }

    case CREATE_RELEASE_REQUEST:
      return {
        ...state,
        isLoading: true,
        getItemFailed: null,
      }
    case CREATE_RELEASE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        createSuccess: payload,
      }
    case CREATE_RELEASE_FAILED:
      return {
        ...state,
        isLoading: false,
        createFailed: payload,
      }

    case DELETE_RELEASE_REQUEST:
      return {
        ...state,
        isLoading: true,
        deleteFailed: null,
      }
    case DELETE_RELEASE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteSuccess: payload,
      }
    case DELETE_RELEASE_FAILED:
      return {
        ...state,
        isLoading: false,
        deleteFailed: payload,
      }

    case RESET_RELEASE:
      return initState

    default:
      return state;
  }
};
