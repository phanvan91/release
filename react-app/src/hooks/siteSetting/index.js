import { useDispatch, useSelector } from 'react-redux';
import {
  toggleSibarState,
} from '../../redux/siteSetting/action';

const getSelector = key => state => state.siteSetting[key];

const showSidebarSelector = getSelector('showSidebar');

export const useToggleSibar = () => {
  const dispatch = useDispatch();
  const showSidebar = useSelector(showSidebarSelector);

  const _toggleSibar = () => {
    dispatch(toggleSibarState());
  };

  return [showSidebar, _toggleSibar];
};
