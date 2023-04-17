import PropTypes from 'prop-types';
import { PATH_APP } from '../../routes/paths';
import { Navigate } from 'react-router-dom';
import { useToken } from '../../hooks/auth';

GuestProtect.propTypes = {
  children: PropTypes.node
};

function GuestProtect({ children }) {
  const [, token] = useToken();

  if (token) {
    return <Navigate to={PATH_APP.root} />;
  }

  return children;
}

export default GuestProtect;
