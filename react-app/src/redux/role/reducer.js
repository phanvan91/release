import {
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILED,
} from '../../constants/actionTypes';

const initState = {
  isLoading: false,
  getListFailed: null,
  list: [],
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case GET_ROLES_REQUEST:
      return {
        ...state,
        isLoading: true,
        // list: [],
        getListFailed: null,
      }

    case GET_ROLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: payload,
      }

    case GET_ROLES_FAILED:
      return {
        ...state,
        isLoading: false,
        getListFailed: null,
      }

    default:
      return state;
  }
};
