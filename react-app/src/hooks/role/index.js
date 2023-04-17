import {
  useFetch,
} from '../utils';
import {
  getRoles,
} from '../../redux/role/action';

const getSelector = key => state => state.role[key];

const loadingSelector = getSelector('isLoading');
const listSelector = getSelector('list');
const getListFailedSelector = getSelector('getListFailed');

export const useRoles = query => {
  return useFetch({
    action: getRoles,
    loadingSelector,
    dataSelector: listSelector,
    failedSelector: getListFailedSelector,
    param: query
  });
};
