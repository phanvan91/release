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
  getProjects,
  createProjectRequest,
  resetProjectState,
  getProjectDetailRequest,
  updateProjectRequest,
  deleteProjectRequest,
} from '../../redux/project/action';
import Api from 'api'

const getSelector = key => state => state.project[key];

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

export const useProjectsQueryParams = () => {
  const query = useQueryParams();
  const page = query.get('page') || 1;
  const per_page = query.get('per_page') || 10;

  return useMemo(() => {
    return {
      page,
      per_page,
      order_by_created_at: 'desc',
    };
    //eslint-disable-next-line
  }, [page, per_page]);
};

export const useProjects = (param) => {
  return useFetchByParam({
    action: getProjects,
    loadingSelector,
    dataSelector: listSelector,
    failedSelector: getListFailedSelector,
    param
  });
};

export const asyncProjects = (param) => {
  return Api.project.getAll(param)
    .then(res => Promise.resolve(res.data))
};

export const useProjectsResParams = () => {
  return useSelector(paramsSelector)
};

export const useInitProject = (project) => {
  return useMemo(() => {
    return {
      id: project?.id || null,
      name: project?.name || '',
      giturl: project?.giturl || '',
      description: project?.description || '',
    }
  }, [project])
}

export const useCreateProject = () => {
  const navigate = useNavigate();
  const [isLoading, handleSubmit] = useSubmit({
    loadingSelector,
    action: createProjectRequest
  });

  const successCallback = () => navigate("/project");

  useSuccess(createSuccessSelector, 'Create project success', successCallback);
  useFailed(createFailedSelector, 'Create project Failed');

  return [isLoading, handleSubmit];
}

export const useUpdateProject = () => {
  const navigate = useNavigate();
  const [isLoading, handleSubmit] = useSubmit({
    loadingSelector,
    action: updateProjectRequest
  });

  const successCallback = () => navigate("/project");

  useSuccess(updateSuccessSelector, 'Update project success', successCallback);
  useFailed(updateFailedSelector, 'Update project Failed');

  return [isLoading, handleSubmit];
}

export const useResetProject = () => {
  useResetState(resetProjectState);
};

export const useProjectDetail = (param) => {
  return useFetchByParam({
    action: getProjectDetailRequest,
    loadingSelector,
    dataSelector: itemSelector,
    failedSelector: getItemFailedSelector,
    param
  });
};

export const useDeleteProject = (params) => {
  const dispatch = useDispatch();
  const [isLoading, handleSubmit] = useSubmit({
    loadingSelector,
    action: deleteProjectRequest
  });

  const successCallback = () => {dispatch(getProjects(params))}

  useSuccess(deleteSuccessSelector, 'Delete project success', successCallback);
  useFailed(deleteFailedSelector, 'Delete project Failed');

  return [isLoading, handleSubmit];
}
