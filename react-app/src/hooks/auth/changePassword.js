import { useMemo } from 'react';
import {
  useFailed,
  useSubmit,
  useSuccess,
  useResetState
} from '../utils';
import {
  changePasswordRequest,
  resetChangePasswordState,
} from '../../redux/auth/action';
import { useNavigate } from "react-router-dom";

const getSelector = key => state => state.auth[key];

const loadingSelector = getSelector('isLoadingchangePassword');
const changePasswordSuccessSelector = getSelector('changePasswordSuccess');
const changePasswordFailedSelector = getSelector('changePasswordFailed');

export const useInitChangePassword = () => {
  return useMemo(() => {
    return {
      password: '',
      new_password: '',
      new_password_confirmation: '',
    }
  }, [])
}

export const useChangePassword = (form) => {
  const navigate = useNavigate();
  const [isLoading, handleSubmit] = useSubmit({
    loadingSelector,
    action: changePasswordRequest
  });

  const successCallback = () => navigate("/");

  const failCallback = (e) => {
    if (e.errors) {
      e.errors.map((error) => {
        form.setError(error.param, { message: error.msg })
      })
    }
  }

  useSuccess(changePasswordSuccessSelector, 'Update password success', successCallback);
  useFailed(changePasswordFailedSelector, 'Update password Failed', failCallback);


  return [isLoading, handleSubmit];
}

export const useResetChangePassword = () => {
  useResetState(resetChangePasswordState);
};
