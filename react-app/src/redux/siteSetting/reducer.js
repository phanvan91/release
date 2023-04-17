import {
  TOGGLE_SIDEBAR
} from '../../constants/actionTypes';

const initState = {
  showSidebar: false,
};

export default (state = initState, { type, /*payload*/ }) => {
  switch (type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar,
      }
    default:
      return state;
  }
};
