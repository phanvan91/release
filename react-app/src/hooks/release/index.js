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
  getReleases,
  createReleaseRequest,
  resetReleaseState,
  getReleaseDetail,
  deleteReleaseRequest,
} from '../../redux/release/action';

const MAP_KEY = {
  "project_id": "project",
  "platform": "platform",
  "env_id": "environment",
  "version": "version",
  "title": "title",
  "note": "note",
  "apk": "apk",
  "ipa": "ipa",
  "bundle-identifier": "bundleIdentifier",
  "bundle-version": "bundleVersion",
  "bundle-title": "bundleTitle",
}

const getSelector = key => state => state.release[key];

const loadingSelector = getSelector('isLoading');
const listSelector = getSelector('list');
const paramsSelector = getSelector('listParams');
const getListFailedSelector = getSelector('getListFailed');

const itemSelector = getSelector('item');
const getItemFailedSelector = getSelector('getItemFailed');

const createSuccessSelector = getSelector('createSuccess');
const createFailedSelector = getSelector('createFailed');

const deleteSuccessSelector = getSelector('deleteSuccess');
const deleteFailedSelector = getSelector('deleteFailed');

export const useReleasesQueryParams = () => {
  const query = useQueryParams();
  const page = query.get('page') || 1;
  const per_page = query.get('per_page') || 10;
  const project_id = query.get('project_id');
  const env_id = query.get('env_id');
  const platform = query.get('platform');

  return useMemo(() => {
    return {
      page,
      per_page,
      relation_project: true,
      relation_env: true,
      order_by_created_at: 'desc',
      project_id: project_id || undefined,
      env_id: env_id || undefined,
      platform: platform || undefined,
    };
    //eslint-disable-next-line
  }, [page, per_page, project_id, env_id, platform]);
};

export const useReleases = param => {
  return useFetchByParam({
    action: getReleases,
    loadingSelector,
    dataSelector: listSelector,
    failedSelector: getListFailedSelector,
    param
  });
};

export const useReleasesResParams = () => {
  return useSelector(paramsSelector)
};

export const useInitRelease = () => {
  return useMemo(() => {
    return {
      project: '',
      platform: '',
      environment: '',
      version: '',
      title: '',
      note: '',
      apk: null,
      windows: null,
      ipa: null,
      bundleIdentifier: '', // 'com.enjoyworks.playmoongu.admin',
      bundleVersion: '', // '1.1.1',
      bundleTitle: '', // 'Playmoongu-Admin',
    }
  }, [])
}

export const useCreateRelease = (form) => {
  const navigate = useNavigate();
  const [isLoading, handleSubmit] = useSubmit({
    loadingSelector,
    action: createReleaseRequest
  });

  const successCallback = () => navigate("/");

  const failCallback = (e) => {
    if (e.errors) {
      Object.keys(e.errors).map((name) => {
        form.setError(MAP_KEY[name] || name, { message: e.errors[name][0] })
      })
    }
  }

  useSuccess(createSuccessSelector, 'Create release success', successCallback);
  useFailed(createFailedSelector, 'Create release Failed', failCallback);

  const _handleSubmit = (values) => {
    let formData = new FormData();
    const data = {
      "project_id": values.project.value,
      "platform": values.platform.value,
      "env_id": values.environment.value,
      "version": values.version,
      "title": values.title,
      "note": values.note,
      "apk": values.apk ? values.apk[0] : null,
      "ipa": values.ipa ? values.ipa[0] : null,
      "windows": values.windows ? values.windows[0] : null,
      "bundle-identifier": values.bundleIdentifier,
      "bundle-version": values.bundleVersion,
      "bundle-title": values.bundleTitle,
    }
    Object.keys(data).map((key) => {
      formData.append(key, data[key])
    })

    return handleSubmit(formData)
  }

  return [isLoading, _handleSubmit];
}

export const useResetRelease = () => {
  useResetState(resetReleaseState);
};

export const useReleaseDetail = (param) => {
  return useFetchByParam({
    action: getReleaseDetail,
    loadingSelector,
    dataSelector: itemSelector,
    failedSelector: getItemFailedSelector,
    param
  });
};

export const useDeleteRelease = (params) => {
  const dispatch = useDispatch();
  const [isLoading, handleSubmit] = useSubmit({
    loadingSelector,
    action: deleteReleaseRequest
  });

  const successCallback = () => {dispatch(getReleases(params))}

  useSuccess(deleteSuccessSelector, 'Delete release success', successCallback);
  useFailed(deleteFailedSelector, 'Delete release Failed');

  return [isLoading, handleSubmit];
}
