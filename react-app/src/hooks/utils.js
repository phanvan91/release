import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useSuccess = (successSelector, message, onSuccess) => {
  const success = useSelector(successSelector);

  useEffect(() => {
    if (success) {
      if (message) {
        console.log(message)
      }

      if (onSuccess) onSuccess(success);
    }
    //eslint-disable-next-line
  }, [success, message]);
};

export const useFailed = (failedSelector, message, onFailed) => {
  const failed = useSelector(failedSelector);

  useEffect(() => {
    if (failed) {
      console.log(message)
    }

    if (onFailed && failed) onFailed(failed);
  //eslint-disable-next-line
  }, [failed, message]);
};

export const useFetch = props => {
  const { action, dataSelector, failedSelector, loadingSelector } = props;

  const dispatch = useDispatch();
  const data = useSelector(dataSelector);
  const isLoading = useSelector(loadingSelector);

  useEffect(() => {
    dispatch(action());
  }, [dispatch, action]);

  useFailed(failedSelector);

  return [data, isLoading];
};

export const useFetchByParam = props => {
  const {
    action,
    dataSelector,
    failedSelector,
    loadingSelector,
    param
  } = props;

  const dispatch = useDispatch();
  const data = useSelector(dataSelector);
  const isLoading = useSelector(loadingSelector);

  useEffect(() => {
    if (param) dispatch(action(param));
  }, [dispatch, action, param]);

  useFailed(failedSelector);

  return [data, isLoading];
};

export const useSubmit = ({ loadingSelector, action }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(loadingSelector);

  const handleSubmit = values => {
    dispatch(action(values));
  };

  return [isLoading, handleSubmit];
};

export const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

export const useResetState = resetAction => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetAction());
    };
  }, [dispatch, resetAction]);
};

export function removeAccents(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export const filterAcrossAccents = (input, option) => {
  console.log(option);

  return (
    removeAccents(option.children.toLowerCase()).indexOf(input.toLowerCase()) >=
    0
  );
};

export const filterGroupAcrossAccents = (input, group) => {
  return {
    ...group,
    options: group.options.filter(
      option =>
        removeAccents(option.children.toLowerCase()).indexOf(
          input.toLowerCase()
        ) >= 0
    )
  };
};
