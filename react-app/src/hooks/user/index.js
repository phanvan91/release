import { useMemo } from 'react';
import {
  useFailed,
  useFetchByParam,
  useQueryParams,
  useSubmit,
  useSuccess,
  useResetState
} from '../utils';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
  getUsers,
  resetUserState,
  getUserDetailRequest,
  updateUserRequest,
  deleteUserRequest,
} from '../../redux/user/action';

const getSelector = key => state => state.user[key];

const loadingSelector = getSelector('isLoading');
const listSelector = getSelector('list');
const paramsSelector = getSelector('listParams');
const getListFailedSelector = getSelector('getListFailed');

const itemSelector = getSelector('item');
const getItemFailedSelector = getSelector('getItemFailed');

const updateSuccessSelector = getSelector('updateSuccess');
const updateFailedSelector = getSelector('updateFailed');

const deleteSuccessSelector = getSelector('deleteSuccess');
const deleteFailedSelector = getSelector('deleteFailed');

export const useUsersQueryParams = () => {
  const query = useQueryParams();
  const page = query.get('page') || 1;
  const per_page = query.get('per_page') || 10;
  const keyword = query.get('keyword');

  return useMemo(() => {
    return {
      page,
      per_page,
      order_by_created_at: 'desc',
      keyword: keyword || undefined
    };
    //eslint-disable-next-line
  }, [page, per_page, keyword]);
};

export const useUsers = query => {
  return useFetchByParam({
    action: getUsers,
    loadingSelector,
    dataSelector: listSelector,
    failedSelector: getListFailedSelector,
    param: query
  });
};

export const useUsersResParams = () => {
  return useSelector(paramsSelector)
};

export const useInitUser = (user) => {

  return useMemo(() => {
    return {
      id: user?.id || null,
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      role_id: user?.roles.map(e => ('' + e.id)) || null,
    }
  }, [user])
}

export const useUpdateUser = () => {
  const navigate = useNavigate();
  const [isLoading, handleSubmit] = useSubmit({
    loadingSelector,
    action: updateUserRequest
  });

  const successCallback = () => navigate("/user");

  useSuccess(updateSuccessSelector, 'Update user success', successCallback);
  useFailed(updateFailedSelector, 'Update user Failed');

  return [isLoading, handleSubmit];
}

export const useResetUser = () => {
  useResetState(resetUserState);
};

export const useUserDetail = (param) => {
  return useFetchByParam({
    action: getUserDetailRequest,
    loadingSelector,
    dataSelector: itemSelector,
    failedSelector: getItemFailedSelector,
    param
  });
};

export const useDeleteUser = (params) => {
  const dispatch = useDispatch();
  const [isLoading, handleSubmit] = useSubmit({
    loadingSelector,
    action: deleteUserRequest
  });

  const successCallback = () => {dispatch(getUsers(params))}

  useSuccess(deleteSuccessSelector, 'Delete User success', successCallback);
  useFailed(deleteFailedSelector, 'Delete User Failed');

  return [isLoading, handleSubmit];
}
