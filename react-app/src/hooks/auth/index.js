import {
  useFailed,
  useFetch,
  useSubmit,
  useSuccess,
  useResetState
} from '../utils';
import { useSelector } from 'react-redux';
import {
  loginRequest,
  registerRequest,
  getProfileRequest,
  logoutRequest,
  resetLoginState,
  resetRegisterState,
} from '../../redux/auth/action';
import { useNavigate } from "react-router-dom";
import { hasRole } from 'utils/entrust/hasRole';

const getSelector = key => state => state.auth[key];

const loadingSelector = getSelector('isLoading');
const tokenSelector = getSelector('token');
const userSelector = getSelector('user');
const loadingLoginSelector = getSelector('isLoadingLogin');
const loginFailedSelector = getSelector('loginFailed');

const profileFailedSelector = getSelector('profileFailed');

const loadingRegisterSelector = getSelector('isLoadingRegister');
const registerSuccessSelector = getSelector('registerSuccess');
const registerFailedSelector = getSelector('registerFailed');

export const useLogin = (form) => {
  const [isLoading, handleSubmit] = useSubmit({
    loadingSelector: loadingLoginSelector,
    action: loginRequest
  });

  const failCallback = (e) => {
    if (e.errors) {
      Object.keys(e.errors).map((name) => {
        form.setError(name, { message: e.errors[name][0] })
      })
    } else if (e.message === 'Unauthorized') {
      form.setError('email', { message: 'Unauthorized' })
    }

    if (e.msg) {
      form.setError('email', { message: 'user not found!' })
    }
  }

  useSuccess(tokenSelector, 'Login success');
  useFailed(loginFailedSelector, 'Login Failed', failCallback);

  return [isLoading, handleSubmit];
};

export const useRegister = (form) => {
  const navigate = useNavigate();

  const [isLoading, handleSubmit] = useSubmit({
    loadingSelector: loadingRegisterSelector,
    action: registerRequest
  });

  const successCallback = () => navigate("/user");

  const failCallback = (e) => {
    Object.keys(e.errors).map((name) => {
      form.setError(name, { message: e.errors[name][0] })
    })
  }

  useSuccess(registerSuccessSelector, 'Register success', successCallback);
  useFailed(registerFailedSelector, 'Register Failed', failCallback);

  const _handleSubmit = (values) => {
    const data = {...values, password_confirmation: values.password}
    handleSubmit(data)
  }

  return [isLoading, _handleSubmit];
};

export const useUser = () => {
  const user = useSelector(userSelector);
  const isLoading = useSelector(loadingSelector);
  return [isLoading, user];
};

export const useToken = () => {
  const token = useSelector(tokenSelector);
  const isLoading = useSelector(loadingSelector);
  return [isLoading, token];
};

export const useProfile = () => {
  return useFetch({
    action: getProfileRequest,
    loadingSelector,
    dataSelector: userSelector,
    failedSelector: profileFailedSelector,
  });
};

export const useLogout = () => {
  const [, handleLogout] = useSubmit({
    loadingSelector,
    action: logoutRequest
  });

  return handleLogout;
};

export const useRole = (role) => {
  const user = useSelector(userSelector);
  
  return hasRole(user, role)
};

export const useResetLogin = () => {
  useResetState(resetLoginState);
};

export const useResetRegister = () => {
  useResetState(resetRegisterState);
};
