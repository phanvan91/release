import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  GET_PROFILE_REQUEST,
  LOGOUT_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  RESET_CHANGE_PASSWORD,
  RESET_LOGIN,
  RESET_REGISTER,
} from '../../constants/actionTypes';

export const loginRequest = user => ({
  type: LOGIN_REQUEST,
  payload: user
});

export const registerRequest = user => ({
  type: REGISTER_REQUEST,
  payload: user
});

export const getProfileRequest = user => ({
  type: GET_PROFILE_REQUEST,
  payload: user
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const changePasswordRequest = (param) => ({
  type: CHANGE_PASSWORD_REQUEST,
  payload: param
});

export const resetChangePasswordState = () => ({
  type: RESET_CHANGE_PASSWORD
});

export const resetLoginState = () => ({
  type: RESET_LOGIN
});

export const resetRegisterState = () => ({
  type: RESET_REGISTER
});
