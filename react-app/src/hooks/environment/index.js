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
  getEnvironments,
  createEnvironmentRequest,
  resetEnvironmentState,
  getEnvironmentDetailRequest,
  updateEnvironmentRequest,
  deleteEnviromentRequest,
} from '../../redux/environment/action';
import Api from 'api'

const getSelector = key => state => state.environment[key];

const loadingSelector = getSelector('isLoading');
const listSelector = getSelector('list');
const paramsSelector = getSelector('listParams');
const getListFailedSelector = getSelector('getListFailed');

const itemSelector = getSelector('item');
const getItemFailedSelector = getSelector('getItemFailed');

const createSuccessSelector = getSelector('createSuccess');
const createFailedSelector = getSelector('createFailed');

const updateSuccessSelector = getSelector('updateSuccess');
const updateFailedSelector = getSelector('updateFailed');

const deleteSuccessSelector = getSelector('deleteSuccess');
const deleteFailedSelector = getSelector('deleteFailed');

export const useEnvironmentsQueryParams = () => {
  const query = useQueryParams();
  const page = query.get('page') || 1;
  const per_page = query.get('per_page') || 10;
  const project_id = query.get('project_id');

  return useMemo(() => {
    return {
      page,
      per_page,
      order_by_created_at: 'desc',
      project_id: project_id || undefined,
    };
    //eslint-disable-next-line
  }, [page, per_page, project_id]);
};

export const useEnvironments = (param) => {
  return useFetchByParam({
    action: getEnvironments,
    loadingSelector,
    dataSelector: listSelector,
    failedSelector: getListFailedSelector,
    param
  });
};

export const asyncEnvironments = (param) => {
  return Api.environment.getAll(param)
    .then(res => Promise.resolve(res.data))
};

export const useEnvironmentsResParams = () => {
  return useSelector(paramsSelector)
};

export const useInitEnvironment = (environment, projects) => {
  let project_id = null
  if (environment?.project_id) {
    project_id = projects.find(e => e.id == environment.project_id)
    if (project_id) {
      project_id = {
        value: project_id.id,
        label: project_id.name,
      }
    }
  }

  return useMemo(() => {
    return {
      id: environment?.id || null,
      project_id: project_id,
      name: environment?.name || '',
      baseurl: environment?.baseurl || '',
      description: environment?.description || '',
    }
  }, [environment, project_id])
}

export const useCreateEnvironment = () => {
  const navigate = useNavigate();
  const [isLoading, handleSubmit] = useSubmit({
    loadingSelector,
    action: createEnvironmentRequest
  });

  const successCallback = () => navigate("/environment");

  useSuccess(createSuccessSelector, 'Create environment success', successCallback);
  useFailed(createFailedSelector, 'Create environment Failed');

  const _handleSubmit = (values) => {
    const data = {...values, project_id: values.project_id?.value}
    return handleSubmit(data)
  }

  return [isLoading, _handleSubmit];
}

export const useUpdateEnvironment = () => {
  const navigate = useNavigate();
  const [isLoading, handleSubmit] = useSubmit({
    loadingSelector,
    action: updateEnvironmentRequest
  });

  const successCallback = () => navigate("/environment");

  useSuccess(updateSuccessSelector, 'Update environment success', successCallback);
  useFailed(updateFailedSelector, 'Update environment Failed');

  const _handleSubmit = (values) => {
    const data = {...values, project_id: values.project_id?.value}
    return handleSubmit(data)
  }

  return [isLoading, _handleSubmit];
}

export const useResetEnvironment = () => {
  useResetState(resetEnvironmentState);
};

export const useEnvironmentDetail = (param) => {
  return useFetchByParam({
    action: getEnvironmentDetailRequest,
    loadingSelector,
    dataSelector: itemSelector,
    failedSelector: getItemFailedSelector,
    param
  });
};

export const useDeleteEnvironment = (params) => {
  const dispatch = useDispatch();
  const [isLoading, handleSubmit] = useSubmit({
    loadingSelector,
    action: deleteEnviromentRequest
  });

  const successCallback = () => {dispatch(getEnvironments(params))}

  useSuccess(deleteSuccessSelector, 'Delete environment success', successCallback);
  useFailed(deleteFailedSelector, 'Delete environment Failed');

  return [isLoading, handleSubmit];
}
