import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,

  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,

  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,

  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,

  LOGOUT_REQUEST,
  
  RESET_LOGIN,
  RESET_REGISTER,
  RESET_CHANGE_PASSWORD,
} from '../../constants/actionTypes';

import { removeAxiosToken } from './../../api/requester';

const initState = {
  isLoading: null,
  getListFailed: undefined,
  error: undefined,

  profileFailed: null,

  isLoadingLogin: null,
  token: localStorage.getItem('token') || null,
  user: null,
  loginFailed: null,

  isLoadingRegister: null,
  registerSuccess: null,
  registerFailed: null,

  isLoadingchangePassword: null,
  changePasswordSuccess: null,
  changePasswordFailed: null,
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoadingLogin: true,
        token: null,
        loginFailed: null,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        isLoadingLogin: false,
        loginFailed: null,
      }
    case LOGIN_FAILED:
      return {
        ...state,
        loginFailed: payload,
        isLoadingLogin: false,
      }

    case REGISTER_REQUEST:
      return {
        ...state,
        isLoadingRegister: true,
        registerSuccess: null,
        registerFailed: null,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: payload,
        isLoadingRegister: false,
        registerFailed: null,
      }
    case REGISTER_FAILED:
      return {
        ...state,
        registerSuccess: null,
        registerFailed: payload,
        isLoadingRegister: false,
      }

    case GET_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        profileFailed: null,
      }
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: payload,
        isLoading: false,
        profileFailed: null,
      }
    case GET_PROFILE_FAILED:
      return {
        ...state,
        isLoading: false,
        profileFailed: payload,
      }
      
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoadingchangePassword: true,
        changePasswordFailed: null,
      }
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoadingchangePassword: false,
        changePasswordSuccess: payload,
      }
    case CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        isLoadingchangePassword: false,
        changePasswordFailed: payload,
      }

    case RESET_CHANGE_PASSWORD:
      return {
        ...state,
        isLoadingchangePassword: null,
        changePasswordSuccess: null,
        changePasswordFailed: null,
      }

    case RESET_LOGIN:
      return {
        ...state,
        isLoadingLogin: null,
        loginFailed: null,
      }

    case RESET_REGISTER:
      return {
        ...state,
        isLoadingRegister: null,
        registerSuccess: null,
        registerFailed: null,
      }

    case LOGOUT_REQUEST:
      removeAxiosToken()
      return {
        ...initState,
        isLoading: false,
        token: null
      }

    default:
      return state;
  }
};
